/**
 * Dish Image Provider Service
 * Handles fetching dish images from external APIs (Pexels, Unsplash)
 * Used as fallback when no manual upload or restaurant photo is available
 */

const axios = require('axios');

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

/**
 * Search for dish images on Pexels
 */
async function searchPexelsImages(query, perPage = 10) {
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'optional_pexels_key') {
    console.warn('PEXELS_API_KEY not configured');
    return [];
  }

  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: `${query} food`,
        per_page: perPage,
        orientation: 'horizontal',
      },
    });

    return response.data.photos.map((photo) => ({
      url: photo.src.large,
      mediumUrl: photo.src.medium,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      source: 'Pexels',
      sourceUrl: photo.url,
    }));
  } catch (error) {
    console.error('Pexels search error:', error.message);
    return [];
  }
}

/**
 * Search for dish images on Unsplash
 */
async function searchUnsplashImages(query, perPage = 10) {
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'optional_unsplash_key') {
    console.warn('UNSPLASH_ACCESS_KEY not configured');
    return [];
  }

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query: `${query} food`,
        per_page: perPage,
        orientation: 'landscape',
      },
    });

    return response.data.results.map((photo) => ({
      url: photo.urls.regular,
      mediumUrl: photo.urls.small,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      source: 'Unsplash',
      sourceUrl: photo.links.html,
    }));
  } catch (error) {
    console.error('Unsplash search error:', error.message);
    return [];
  }
}

/**
 * Search for dish images with fallback chain
 */
async function searchDishImages(dishName, cuisineType = '') {
  const query = cuisineType ? `${dishName} ${cuisineType}` : dishName;

  // Try Pexels first
  const pexelsResults = await searchPexelsImages(query, 5);
  if (pexelsResults.length > 0) {
    return pexelsResults;
  }

  // Fallback to Unsplash
  const unsplashResults = await searchUnsplashImages(query, 5);
  if (unsplashResults.length > 0) {
    return unsplashResults;
  }

  // Try with broader query
  const broaderQuery = dishName.split(' ')[0]; // Use first word
  const pexelsBroader = await searchPexelsImages(broaderQuery, 5);
  if (pexelsBroader.length > 0) {
    return pexelsBroader;
  }

  return [];
}

/**
 * Suggest dish images for a specific dish
 */
async function suggestDishImages(dish) {
  const dishName = dish.name || dish.name?.en || '';
  const cuisineType = dish.cuisineType || dish.category || '';

  if (!dishName) {
    return [];
  }

  const images = await searchDishImages(dishName, cuisineType);

  return images.map((img) => ({
    ...img,
    attribution: {
      provider: img.source,
      authorName: img.photographer,
      authorUri: img.photographerUrl,
      sourceUri: img.sourceUrl,
    },
  }));
}

/**
 * Common dish image queries for Israeli/Mediterranean cuisine
 */
const COMMON_DISH_QUERIES = {
  hummus: 'hummus Israeli food',
  falafel: 'falafel pita Israel',
  shakshuka: 'shakshuka Israeli breakfast',
  sabich: 'sabich sandwich',
  israeli_salad: 'Israeli salad',
  tabouleh: 'tabouleh salad',
  tahini: 'tahini sauce',
  baba_ganoush: 'baba ganoush',
  bourekas: 'bourekas pastry',
  jachnoun: 'jachnoun Yemeni bread',
  schnitzel: 'chicken schnitzel',
  entrecote: 'steak entrecote',
  lamb_kebab: 'lamb kebab',
  sea_bass: 'grilled sea bass',
  malabi: 'malabi dessert',
  knafeh: 'knafeh dessert',
  baklava: 'baklava pastry',
};

/**
 * Get image query for a dish based on its name
 */
function getDishImageQuery(dishName) {
  const normalized = dishName.toLowerCase().replace(/[^a-z\s]/g, '');
  
  for (const [key, query] of Object.entries(COMMON_DISH_QUERIES)) {
    if (normalized.includes(key.replace(/_/g, ' '))) {
      return query;
    }
  }

  return `${dishName} food`;
}

module.exports = {
  searchPexelsImages,
  searchUnsplashImages,
  searchDishImages,
  suggestDishImages,
  getDishImageQuery,
  COMMON_DISH_QUERIES,
};
