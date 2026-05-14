/**
 * Data Helper Functions
 * Provides derived data access functions from canonical sources
 */

import { restaurants } from './restaurants.data';
import { dishes } from './dishes.data';

/**
 * Get restaurant by ID
 */
export const getRestaurantById = (id) => {
  return restaurants.find((r) => r.id === id) || null;
};

/**
 * Get dishes by restaurant ID
 */
export const getDishesByRestaurantId = (restaurantId) => {
  return dishes.filter((d) => d.restaurantId === restaurantId);
};

/**
 * Get restaurant with its dishes
 */
export const getRestaurantWithDishes = (restaurantId) => {
  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant) return null;

  const restaurantDishes = getDishesByRestaurantId(restaurantId);

  return {
    ...restaurant,
    dishes: restaurantDishes,
  };
};

/**
 * Get dish by ID
 */
export const getDishById = (id) => {
  return dishes.find((d) => d.id === id) || null;
};

/**
 * Get featured dishes
 */
export const getFeaturedDishes = () => {
  return dishes.filter((d) => d.isPopular || d.isChefChoice);
};

/**
 * Get restaurants by city
 */
export const getRestaurantsByCity = (city) => {
  return restaurants.filter((r) => r.city === city);
};

/**
 * Get restaurants by kosher level
 */
export const getRestaurantsByKosherLevel = (kosherLevel) => {
  return restaurants.filter((r) => r.kosherLevel === kosherLevel);
};

/**
 * Get dishes by category
 */
export const getDishesByCategory = (category) => {
  return dishes.filter((d) => d.category === category);
};

/**
 * Get vegetarian dishes
 */
export const getVegetarianDishes = () => {
  return dishes.filter((d) => d.isVegetarian);
};

/**
 * Get vegan dishes
 */
export const getVeganDishes = () => {
  return dishes.filter((d) => d.isVegan);
};

/**
 * Get gluten-free dishes
 */
export const getGlutenFreeDishes = () => {
  return dishes.filter((d) => d.isGlutenFree);
};

/**
 * Get all unique cities from restaurants
 */
export const getAllCities = () => {
  const cities = new Set(restaurants.map((r) => r.city));
  return Array.from(cities).sort();
};

/**
 * Get all unique categories from dishes
 */
export const getAllCategories = () => {
  const categories = new Set(dishes.map((d) => d.category));
  return Array.from(categories).sort();
};

/**
 * Search restaurants by name
 */
export const searchRestaurants = (query) => {
  const lowerQuery = query.toLowerCase();
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(lowerQuery) ||
      r.city.toLowerCase().includes(lowerQuery) ||
      (r.cuisineType && r.cuisineType.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Search dishes by name
 */
export const searchDishes = (query) => {
  const lowerQuery = query.toLowerCase();
  return dishes.filter(
    (d) =>
      d.name.en.toLowerCase().includes(lowerQuery) ||
      d.name.fr.toLowerCase().includes(lowerQuery) ||
      d.name.he.includes(lowerQuery) ||
      d.category.toLowerCase().includes(lowerQuery) ||
      (d.ingredients && d.ingredients.some((ing) => ing.toLowerCase().includes(lowerQuery)))
  );
};

export default {
  getRestaurantById,
  getDishesByRestaurantId,
  getRestaurantWithDishes,
  getDishById,
  getFeaturedDishes,
  getRestaurantsByCity,
  getRestaurantsByKosherLevel,
  getDishesByCategory,
  getVegetarianDishes,
  getVeganDishes,
  getGlutenFreeDishes,
  getAllCities,
  getAllCategories,
  searchRestaurants,
  searchDishes,
};
