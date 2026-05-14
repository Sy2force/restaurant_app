/**
 * Image Utility Functions
 * Provides safe image handling with fallbacks
 */

// Placeholder images
const PLACEHOLDERS = {
  restaurant: '/images/placeholders/restaurant-placeholder.jpg',
  dish: '/images/placeholders/dish-placeholder.jpg',
  recipe: '/images/placeholders/recipe-placeholder.jpg',
  user: '/images/placeholders/user-placeholder.jpg',
  cover: '/images/placeholders/cover-placeholder.jpg',
};

/**
 * Get safe image with fallback
 */
export const getSafeImage = (image, type = 'dish') => {
  const fallback = PLACEHOLDERS[type] || PLACEHOLDERS.dish;

  if (!image || typeof image !== 'string') {
    return fallback;
  }

  // Check for problematic paths
  const problematicPaths = ['src/assets', '../assets', 'public/images', 'file:///'];
  if (problematicPaths.some((p) => image.includes(p))) {
    console.warn(`Problematic image path detected: ${image}`);
    return fallback;
  }

  return image;
};

/**
 * Get restaurant image with fallback
 */
export const getRestaurantImage = (image) => {
  return getSafeImage(image, 'restaurant');
};

/**
 * Get dish image with fallback
 */
export const getDishImage = (image) => {
  return getSafeImage(image, 'dish');
};

/**
 * Get recipe image with fallback
 */
export const getRecipeImage = (image) => {
  return getSafeImage(image, 'recipe');
};

/**
 * Get user avatar with fallback
 */
export const getUserAvatar = (image) => {
  return getSafeImage(image, 'user');
};

/**
 * Check if image is external URL
 */
export const isExternalImage = (image) => {
  if (!image || typeof image !== 'string') {
    return false;
  }

  return image.startsWith('http://') || image.startsWith('https://');
};

/**
 * Get optimized image URL (for future CDN integration)
 */
export const getOptimizedImage = (image) => {
  if (!image) {
    return PLACEHOLDERS.dish;
  }

  // If external URL, return as-is (future: add CDN transformation)
  if (isExternalImage(image)) {
    return image;
  }

  // For local images, return as-is (future: add image optimization service)
  return image;
};

export default {
  getSafeImage,
  getRestaurantImage,
  getDishImage,
  getRecipeImage,
  getUserAvatar,
  isExternalImage,
  getOptimizedImage,
  PLACEHOLDERS,
};
