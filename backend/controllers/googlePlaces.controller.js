const Restaurant = require('../models/Restaurant');
const axios = require('axios');
const {
  searchRestaurantsInIsrael,
  getPlaceDetails,
  buildPhotoUrl,
  importRestaurantFromGoogle,
  normalizeGoogleRestaurant,
} = require('../services/googlePlaces.service');
const REAL_ISRAEL_RESTAURANTS = require('../data/realIsraelRestaurants');
const { ISRAEL_CITY_IMPORT_PLAN } = require('../data/israelCitiesImportPlan');

/**
 * Search restaurants via Google Places API
 * Public endpoint (no auth required for search)
 */
exports.searchPlaces = async (req, res) => {
  try {
    const { query, city = 'Israel' } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({ message: 'Query must be at least 2 characters' });
    }

    const results = await searchRestaurantsInIsrael(query, city);

    res.json({
      success: true,
      results,
      count: results.length,
    });
  } catch (error) {
    console.error('Search places error:', error.message);
    
    // Check if it's a Google Places configuration error
    if (error.message.includes('403') || error.message.includes('API key')) {
      return res.status(503).json({
        success: false,
        message: 'Google Places API access denied. Please check API key, billing, enabled APIs, and restrictions in Google Cloud Console.',
        error: error.message,
        fallback: 'Use mock restaurants from database instead',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error searching places',
      error: error.message,
    });
  }
};

/**
 * Get detailed information about a place
 * Public endpoint (no auth required)
 */
exports.getPlaceDetails = async (req, res) => {
  try {
    const { placeId } = req.params;

    if (!placeId) {
      return res.status(400).json({ message: 'Place ID is required' });
    }

    const place = await getPlaceDetails(placeId);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json(place);
  } catch (error) {
    console.error('Get place details error:', error);
    res.status(500).json({ message: 'Error getting place details', error: error.message });
  }
};

/**
 * Get photo from Google Places - secure proxy
 * Never exposes API key to frontend
 * Streams image directly from backend
 */
exports.getPlacePhoto = async (req, res) => {
  try {
    const { photoName } = req.query;
    const { maxWidth = 1200 } = req.query;

    if (!photoName) {
      return res.status(400).json({ message: 'Photo name is required' });
    }

    // Validate maxWidth
    const maxWidthNum = parseInt(maxWidth);
    if (isNaN(maxWidthNum) || maxWidthNum < 100 || maxWidthNum > 1600) {
      return res.status(400).json({ message: 'maxWidth must be between 100 and 1600' });
    }

    // Build secure Google Places photo URL (contains API key)
    const googlePhotoUrl = buildPhotoUrl(photoName, maxWidthNum);

    // Stream the image from Google to the client
    const response = await axios.get(googlePhotoUrl, {
      responseType: 'stream',
      timeout: 10000,
    });

    // Set appropriate headers
    res.set({
      'Content-Type': response.headers['content-type'] || 'image/jpeg',
      'Content-Length': response.headers['content-length'],
      'Cache-Control': 'public, max-age=2592000', // 30 days
    });

    // Pipe the image stream to response
    response.data.pipe(res);
  } catch (error) {
    console.error('Get place photo error:', error.message);
    
    // Return fallback image on error
    if (!res.headersSent) {
      res.status(404).json({ 
        message: 'Photo not found or error loading', 
        error: error.message 
      });
    }
  }
};

/**
 * Import a restaurant from Google Places
 * Requires admin or business authentication
 */
exports.importPlace = async (req, res) => {
  try {
    const { placeId } = req.params;

    if (!placeId) {
      return res.status(400).json({ message: 'Place ID is required' });
    }

    // Check if restaurant with this Google Place ID already exists
    const existingRestaurant = await Restaurant.findOne({ googlePlaceId: placeId });
    if (existingRestaurant) {
      return res.status(409).json({ 
        message: 'Restaurant already imported',
        restaurant: existingRestaurant 
      });
    }

    // Import from Google Places
    const importedData = await importRestaurantFromGoogle(placeId);

    // Create restaurant in database
    const restaurantData = {
      ...importedData,
      ownerId: req.userId,
      status: 'pending', // Requires approval
    };

    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();

    res.status(201).json({
      message: 'Restaurant imported successfully',
      restaurant,
    });
  } catch (error) {
    console.error('Import place error:', error);
    res.status(500).json({ message: 'Error importing place', error: error.message });
  }
};

/**
 * Bulk import restaurants from predefined list
 * Requires admin authentication
 */
exports.bulkImport = async (req, res) => {
  try {
    const { restaurants } = req.body;

    // If no restaurants provided, use the predefined list
    const restaurantsToImport = Array.isArray(restaurants) && restaurants.length > 0
      ? restaurants
      : REAL_ISRAEL_RESTAURANTS;

    const results = {
      imported: [],
      skipped: [],
      failed: [],
    };

    for (const item of restaurantsToImport) {
      try {
        const { query, city } = item;

        // Search for the restaurant
        const searchResults = await searchRestaurantsInIsrael(query, city);
        
        if (!searchResults || searchResults.length === 0) {
          results.skipped.push({
            query,
            city,
            status: 'skipped',
            reason: 'No results found',
          });
          continue;
        }

        // Pick the best result (first one for now, could be improved with scoring)
        const bestResult = searchResults[0];

        // Check if already imported by googlePlaceId
        const existingByPlaceId = await Restaurant.findOne({ googlePlaceId: bestResult.id });
        if (existingByPlaceId) {
          results.skipped.push({
            query,
            city,
            status: 'skipped',
            reason: 'Already imported (googlePlaceId)',
            restaurantName: existingByPlaceId.name,
            googlePlaceId: bestResult.id,
          });
          continue;
        }

        // Get details and normalize
        const importedData = await importRestaurantFromGoogle(bestResult.id);

        // Check for duplicate slug
        const existingBySlug = await Restaurant.findOne({ slug: importedData.slug });
        if (existingBySlug) {
          results.skipped.push({
            query,
            city,
            status: 'skipped',
            reason: 'Duplicate slug',
            restaurantName: importedData.name,
            slug: importedData.slug,
          });
          continue;
        }

        // Create restaurant in database
        const restaurantData = {
          ...importedData,
          ownerId: req.userId,
          status: 'pending', // Requires approval
        };

        const restaurant = new Restaurant(restaurantData);
        await restaurant.save();

        results.imported.push({
          query,
          city,
          status: 'imported',
          restaurantName: importedData.name,
          googlePlaceId: bestResult.id,
          restaurantId: restaurant._id,
        });
      } catch (error) {
        console.error(`Error importing ${item.query} in ${item.city}:`, error.message);
        results.failed.push({
          query: item.query,
          city: item.city,
          status: 'failed',
          error: error.message,
        });
      }
    }

    res.json({
      message: 'Bulk import completed',
      results,
      summary: {
        total: restaurantsToImport.length,
        imported: results.imported.length,
        skipped: results.skipped.length,
        failed: results.failed.length,
      },
    });
  } catch (error) {
    console.error('Bulk import error:', error);
    res.status(500).json({ message: 'Error during bulk import', error: error.message });
  }
};

/**
 * Import restaurants by city with queries
 * Allows progressive city-based import to avoid quota/cost explosion
 */
exports.importByCity = async (req, res) => {
  try {
    const { city, queries, maxPerCity = 20, onlyWithPhotos = false, minRating = 0 } = req.body;

    if (!city || !queries || !Array.isArray(queries)) {
      return res.status(400).json({ message: 'City and queries array are required' });
    }

    const results = {
      imported: [],
      skipped: [],
      failed: [],
    };

    let importedCount = 0;

    for (const query of queries) {
      if (importedCount >= maxPerCity) {
        break;
      }

      try {
        const searchResults = await searchRestaurantsInIsrael(query, city);
        
        if (!searchResults || searchResults.length === 0) {
          results.skipped.push({
            query,
            city,
            status: 'skipped',
            reason: 'No results found',
          });
          continue;
        }

        // Filter by rating if specified
        const filteredResults = minRating > 0 
          ? searchResults.filter(r => (r.rating || 0) >= minRating)
          : searchResults;

        // Filter by photos if specified
        const finalResults = onlyWithPhotos
          ? filteredResults.filter(r => r.photos && r.photos.length > 0)
          : filteredResults;

        if (finalResults.length === 0) {
          results.skipped.push({
            query,
            city,
            status: 'skipped',
            reason: 'No results matching filters',
          });
          continue;
        }

        // Import the best result
        const bestResult = finalResults[0];

        // Check if already imported by googlePlaceId
        const existingByPlaceId = await Restaurant.findOne({ googlePlaceId: bestResult.id });
        if (existingByPlaceId) {
          results.skipped.push({
            query,
            city,
            status: 'skipped',
            reason: 'Already imported (googlePlaceId)',
            restaurantName: existingByPlaceId.name,
            googlePlaceId: bestResult.id,
          });
          continue;
        }

        // Get details and normalize
        const importedData = await importRestaurantFromGoogle(bestResult.id);

        // Check for duplicate slug
        const existingBySlug = await Restaurant.findOne({ slug: importedData.slug });
        if (existingBySlug) {
          results.skipped.push({
            query,
            city,
            status: 'skipped',
            reason: 'Duplicate slug',
            restaurantName: importedData.name,
            slug: importedData.slug,
          });
          continue;
        }

        // Create restaurant in database
        const restaurantData = {
          ...importedData,
          ownerId: req.userId,
          status: 'pending',
        };

        const restaurant = new Restaurant(restaurantData);
        await restaurant.save();

        results.imported.push({
          query,
          city,
          status: 'imported',
          restaurantName: importedData.name,
          googlePlaceId: bestResult.id,
          restaurantId: restaurant._id,
        });

        importedCount++;
      } catch (error) {
        console.error(`Error importing ${query} in ${city}:`, error.message);
        results.failed.push({
          query,
          city,
          status: 'failed',
          error: error.message,
        });
      }
    }

    res.json({
      message: 'City import completed',
      city,
      results,
      summary: {
        total: queries.length,
        imported: results.imported.length,
        skipped: results.skipped.length,
        failed: results.failed.length,
      },
    });
  } catch (error) {
    console.error('Import by city error:', error);
    res.status(500).json({ message: 'Error during city import', error: error.message });
  }
};

/**
 * Import restaurants from the full city import plan
 * Progressive import across all cities
 */
exports.importPlan = async (req, res) => {
  try {
    const { maxPerCity = 20, maxTotal = 100, onlyWithPhotos = false, minRating = 0 } = req.body;

    const results = {
      imported: [],
      skipped: [],
      failed: [],
    };

    let totalImported = 0;

    for (const cityPlan of ISRAEL_CITY_IMPORT_PLAN) {
      if (totalImported >= maxTotal) {
        break;
      }

      const { city, queries } = cityPlan;
      const cityMax = Math.min(maxPerCity, maxTotal - totalImported);

      try {
        // Call importByCity logic inline for this city
        for (const query of queries) {
          if (totalImported >= maxTotal || results.imported.length >= cityMax) {
            break;
          }

          try {
            const searchResults = await searchRestaurantsInIsrael(query, city);
            
            if (!searchResults || searchResults.length === 0) {
              results.skipped.push({
                query,
                city,
                status: 'skipped',
                reason: 'No results found',
              });
              continue;
            }

            // Filter by rating if specified
            const filteredResults = minRating > 0 
              ? searchResults.filter(r => (r.rating || 0) >= minRating)
              : searchResults;

            // Filter by photos if specified
            const finalResults = onlyWithPhotos
              ? filteredResults.filter(r => r.photos && r.photos.length > 0)
              : filteredResults;

            if (finalResults.length === 0) {
              results.skipped.push({
                query,
                city,
                status: 'skipped',
                reason: 'No results matching filters',
              });
              continue;
            }

            const bestResult = finalResults[0];

            // Check if already imported
            const existingByPlaceId = await Restaurant.findOne({ googlePlaceId: bestResult.id });
            if (existingByPlaceId) {
              results.skipped.push({
                query,
                city,
                status: 'skipped',
                reason: 'Already imported',
                restaurantName: existingByPlaceId.name,
              });
              continue;
            }

            const importedData = await importRestaurantFromGoogle(bestResult.id);

            const existingBySlug = await Restaurant.findOne({ slug: importedData.slug });
            if (existingBySlug) {
              results.skipped.push({
                query,
                city,
                status: 'skipped',
                reason: 'Duplicate slug',
                restaurantName: importedData.name,
              });
              continue;
            }

            const restaurantData = {
              ...importedData,
              ownerId: req.userId,
              status: 'pending',
            };

            const restaurant = new Restaurant(restaurantData);
            await restaurant.save();

            results.imported.push({
              query,
              city,
              status: 'imported',
              restaurantName: importedData.name,
              googlePlaceId: bestResult.id,
              restaurantId: restaurant._id,
            });

            totalImported++;
          } catch (error) {
            console.error(`Error importing ${query} in ${city}:`, error.message);
            results.failed.push({
              query,
              city,
              status: 'failed',
              error: error.message,
            });
          }
        }
      } catch (error) {
        console.error(`Error processing city ${city}:`, error.message);
      }
    }

    res.json({
      message: 'Import plan completed',
      results,
      summary: {
        total: ISRAEL_CITY_IMPORT_PLAN.reduce((sum, cp) => sum + cp.queries.length, 0),
        imported: results.imported.length,
        skipped: results.skipped.length,
        failed: results.failed.length,
      },
    });
  } catch (error) {
    console.error('Import plan error:', error);
    res.status(500).json({ message: 'Error during import plan', error: error.message });
  }
};

/**
 * Get import status/stats and data health
 */
exports.getImportStats = async (req, res) => {
  try {
    const total = await Restaurant.countDocuments();
    const googlePlacesImported = await Restaurant.countDocuments({ source: 'google_places' });
    const manual = await Restaurant.countDocuments({ source: 'manual' });
    const seed = total - googlePlacesImported - manual;

    // Data health checks
    const restaurantsWithoutGooglePhoto = await Restaurant.countDocuments({
      source: 'google_places',
      coverPhotoName: { $exists: false },
    });

    const restaurantsWithoutPhone = await Restaurant.countDocuments({
      source: 'google_places',
      phone: { $exists: false, $eq: '' },
    });

    const restaurantsWithoutRating = await Restaurant.countDocuments({
      source: 'google_places',
      rating: { $exists: false, $eq: 0 },
    });

    // Check for duplicate googlePlaceIds
    const duplicateGooglePlaceIds = await Restaurant.aggregate([
      {
        $match: {
          googlePlaceId: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: '$googlePlaceId',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    // Check for duplicate slugs
    const duplicateSlugs = await Restaurant.aggregate([
      {
        $group: {
          _id: '$slug',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    res.json({
      total,
      googlePlacesImported,
      manual,
      seed,
      health: {
        restaurantsWithoutGooglePhoto,
        restaurantsWithoutPhone,
        restaurantsWithoutRating,
        duplicateGooglePlaceIds: duplicateGooglePlaceIds.length,
        duplicateSlugs: duplicateSlugs.length,
      },
      duplicates: {
        googlePlaceIds: duplicateGooglePlaceIds.map((d) => ({
          googlePlaceId: d._id,
          count: d.count,
        })),
        slugs: duplicateSlugs.map((d) => ({
          slug: d._id,
          count: d.count,
        })),
      },
    });
  } catch (error) {
    console.error('Get import stats error:', error);
    res.status(500).json({ message: 'Error getting import stats', error: error.message });
  }
};
