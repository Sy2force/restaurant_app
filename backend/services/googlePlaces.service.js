/**
 * Google Places API Service
 * Handles all interactions with Google Places API for restaurant data
 * API key is kept server-side only
 */

const axios = require('axios');
const cache = require('../cache/googlePlaces.cache');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'your_new_google_places_key_here') {
  console.warn('⚠️  GOOGLE_PLACES_API_KEY not configured in .env');
}

const BASE_URL = 'https://places.googleapis.com/v1';

// Field masks for different API calls to avoid over-fetching
const FIELD_MASKS = {
  searchText: [
    'places.id',
    'places.name',
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.userRatingCount',
    'places.priceLevel',
    'places.photos',
    'places.types',
    'places.businessStatus',
    'places.googleMapsUri',
    'places.websiteUri',
    'places.internationalPhoneNumber',
    'places.regularOpeningHours',
  ].join(','),
  
  details: [
    'id',
    'name',
    'displayName',
    'formattedAddress',
    'location',
    'rating',
    'userRatingCount',
    'priceLevel',
    'priceRange',
    'photos',
    'types',
    'businessStatus',
    'googleMapsUri',
    'websiteUri',
    'internationalPhoneNumber',
    'regularOpeningHours',
    'currentOpeningHours',
    'reservable',
    'dineIn',
    'servesBreakfast',
    'servesLunch',
    'servesDinner',
    'servesVegetarianFood',
    'editorialSummary',
  ].join(','),
};

/**
 * Search restaurants in Israel using Google Places Text Search (New)
 */
async function searchRestaurantsInIsrael(query, city = 'Israel') {
  try {
    const cacheKey = `${query}:${city}`;
    const cached = cache.get('search', cacheKey);
    if (cached) {
      return cached;
    }

    const searchQuery = `${query} restaurant ${city} Israel`;
    
    const response = await axios.post(
      `${BASE_URL}/places:searchText`,
      {
        textQuery: searchQuery,
        includedType: 'restaurant',
        languageCode: 'en',
        regionCode: 'IL',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': FIELD_MASKS.searchText,
        },
      }
    );

    const results = response.data.places || [];
    
    // Cache for 24 hours
    cache.set('search', cacheKey, results);
    
    return results;
  } catch (error) {
    console.error('Google Places search error:', error.message);
    
    // Provide diagnostic information for 403 errors
    if (error.response?.status === 403) {
      throw new Error(
        'Google Places API returned 403 Forbidden. ' +
        'Possible causes: ' +
        '1) Places API (New) is not enabled in Google Cloud Console. ' +
        '2) Billing is not enabled. ' +
        '3) API key is invalid or has been rotated. ' +
        '4) API key restrictions do not allow server-side requests. ' +
        '5) API restrictions do not include Places API or Places API (New). ' +
        '6) Quota has been exceeded. ' +
        'Please check: https://console.cloud.google.com/apis/credentials'
      );
    }
    
    throw new Error(`Failed to search restaurants: ${error.message}`);
  }
}

/**
 * Get detailed information about a place
 */
async function getPlaceDetails(placeId) {
  try {
    const cached = cache.get('details', placeId);
    if (cached) {
      return cached;
    }

    const response = await axios.get(
      `${BASE_URL}/places/${placeId}`,
      {
        headers: {
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': FIELD_MASKS.details,
        },
      }
    );

    const place = response.data;
    
    // Cache for 7 days
    cache.set('details', placeId, place);
    
    return place;
  } catch (error) {
    console.error('Google Places details error:', error.message);
    
    // Provide diagnostic information for 403 errors
    if (error.response?.status === 403) {
      throw new Error(
        'Google Places API returned 403 Forbidden. ' +
        'Possible causes: ' +
        '1) Places API (New) is not enabled in Google Cloud Console. ' +
        '2) Billing is not enabled. ' +
        '3) API key is invalid or has been rotated. ' +
        '4) API key restrictions do not allow server-side requests. ' +
        '5) API restrictions do not include Places API or Places API (New). ' +
        '6) Quota has been exceeded. ' +
        'Please check: https://console.cloud.google.com/apis/credentials'
      );
    }
    
    throw new Error(`Failed to get place details: ${error.message}`);
  }
}

/**
 * Build photo URL from Google Places photo reference
 */
function buildPhotoUrl(photoName, maxWidth = 1200) {
  const cacheKey = `${photoName}:${maxWidth}`;
  const cached = cache.get('photo', cacheKey);
  if (cached) {
    return cached;
  }

  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${GOOGLE_PLACES_API_KEY}`;
  
  // Cache for 30 days
  cache.set('photo', cacheKey, url);
  
  return url;
}

/**
 * Normalize Google Place data to project schema
 */
function normalizeGoogleRestaurant(place) {
  if (!place) return null;

  const location = place.location || {};
  const photos = place.photos || [];
  const primaryPhoto = photos[0];

  // Extract city from formatted address
  const addressParts = (place.formattedAddress || '').split(',');
  const city = addressParts[addressParts.length - 2]?.trim() || 'Unknown';

  // Determine price range from priceLevel
  const priceLevelToRange = {
    PRICE_LEVEL_UNSPECIFIED: '₪',
    PRICE_LEVEL_FREE: '₪',
    PRICE_LEVEL_INEXPENSIVE: '₪₪',
    PRICE_LEVEL_MODERATE: '₪₪₪',
    PRICE_LEVEL_EXPENSIVE: '₪₪₪₪',
    PRICE_LEVEL_VERY_EXPENSIVE: '₪₪₪₪₪',
  };
  const priceRange = priceLevelToRange[place.priceLevel] || '₪₪';

  // Extract cuisine types from place types
  const relevantTypes = (place.types || []).filter(type => 
    type.includes('restaurant') || 
    type.includes('food') ||
    type.includes('cafe') ||
    type.includes('bar')
  );
  const cuisineType = relevantTypes[0] || 'Restaurant';

  // Build image attributions
  const imageAttributions = primaryPhoto?.authorAttributions?.map(attr => ({
    provider: 'Google Places',
    authorName: attr.displayName,
    authorUri: attr.uri,
  })) || [];

  // Store photo names only, not URLs with API keys
  const galleryPhotoNames = photos.slice(0, 5).map(photo => photo.name);

  // Build secure backend endpoint URL for cover image
  const coverImage = primaryPhoto 
    ? `/api/google-places/photo?photoName=${encodeURIComponent(primaryPhoto.name)}&maxWidth=1200`
    : '';

  return {
    googlePlaceId: place.id,
    slug: generateSlug(place.displayName?.text || place.name),
    name: place.displayName?.text || place.name || 'Unknown Restaurant',
    city,
    address: place.formattedAddress || '',
    cuisineType,
    kosherLevel: 'None', // Google doesn't provide kosher info, defaults to None
    priceRange,
    rating: place.rating || 0,
    reviewCount: place.userRatingCount || 0,
    phone: place.internationalPhoneNumber || '',
    website: place.websiteUri || '',
    googleMapsUri: place.googleMapsUri || '',
    openingHours: normalizeOpeningHours(place.regularOpeningHours),
    description: {
      fr: place.editorialSummary?.text || '',
      en: place.editorialSummary?.text || '',
      he: place.editorialSummary?.text || '',
    },
    coverImage,
    coverPhotoName: primaryPhoto ? primaryPhoto.name : null,
    galleryPhotoNames,
    imageProvider: 'google_places',
    imageAttributions,
    coordinates: {
      lat: location.latitude || 0,
      lng: location.longitude || 0,
    },
    source: 'google_places',
    isFeatured: place.rating >= 4.5,
    isPopular: place.userRatingCount >= 100,
    isNew: false,
    reservationAvailable: place.reservable || false,
    businessStatus: place.businessStatus || 'OPERATIONAL',
  };
}

/**
 * Generate URL-friendly slug
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Normalize opening hours to project format
 */
function normalizeOpeningHours(hours) {
  if (!hours || !hours.periods) return null;

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const normalized = {};

  hours.periods.forEach(period => {
    const dayIndex = period.open?.day;
    if (dayIndex !== undefined && days[dayIndex]) {
      const day = days[dayIndex];
      const openTime = period.open?.time || '';
      const closeTime = period.close?.time || '';
      
      // Convert 24h format to readable format
      const formatTime = (time) => {
        if (!time) return 'Closed';
        const hours = parseInt(time.substring(0, 2));
        const minutes = time.substring(2, 4);
        return `${hours}:${minutes}`;
      };

      normalized[day] = `${formatTime(openTime)}-${formatTime(closeTime)}`;
    }
  });

  return normalized;
}

/**
 * Import restaurant from Google Places
 */
async function importRestaurantFromGoogle(placeId) {
  try {
    const placeDetails = await getPlaceDetails(placeId);
    const normalized = normalizeGoogleRestaurant(placeDetails);
    
    if (!normalized) {
      throw new Error('Failed to normalize restaurant data');
    }

    return normalized;
  } catch (error) {
    console.error('Import restaurant error:', error.message);
    throw error;
  }
}

/**
 * Get photo with attribution
 */
async function getPlacePhoto(photoName, maxWidth = 1200) {
  const url = buildPhotoUrl(photoName, maxWidth);
  return {
    url,
    attribution: 'Photo by Google Places',
  };
}

module.exports = {
  searchRestaurantsInIsrael,
  getPlaceDetails,
  buildPhotoUrl,
  normalizeGoogleRestaurant,
  importRestaurantFromGoogle,
  getPlacePhoto,
  FIELD_MASKS,
};
