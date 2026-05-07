import { mockRestaurants } from '../frontend/src/data/mockRestaurants.js';
import { mockDishes } from '../frontend/src/data/mockDishes.js';
import { mockRestaurantDetails } from '../frontend/src/data/mockRestaurantDetails.js';
import { featuredDishes } from '../frontend/src/data/featuredDishes.js';

const errors = [];
const PLACEHOLDER_PATTERNS = [/placeholder/i, /default-restaurant/i, /via\.placeholder/i];

const hasPlaceholder = (value = '') => PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value));

const restaurantIds = new Set();
for (const restaurant of mockRestaurants) {
  if (!restaurant._id) errors.push(`Restaurant without _id: ${restaurant.name || 'unknown'}`);
  if (restaurantIds.has(restaurant._id)) errors.push(`Duplicate restaurant id: ${restaurant._id}`);
  restaurantIds.add(restaurant._id);

  if (!restaurant.name) errors.push(`Restaurant missing name: ${restaurant._id}`);
  if (!restaurant.description) errors.push(`Restaurant missing description: ${restaurant._id}`);
  if (!restaurant.address?.city) errors.push(`Restaurant missing city: ${restaurant._id}`);
  if (!restaurant.address?.street) errors.push(`Restaurant missing street: ${restaurant._id}`);
  if (!restaurant.cuisine?.length) errors.push(`Restaurant missing cuisine: ${restaurant._id}`);
  if (!restaurant.priceRange) errors.push(`Restaurant missing priceRange: ${restaurant._id}`);
  if (typeof restaurant.isKosher !== 'boolean') {
    errors.push(`Restaurant missing isKosher boolean: ${restaurant._id}`);
  }
  if (!restaurant.phone) errors.push(`Restaurant missing phone: ${restaurant._id}`);
  if (!restaurant.openingHours) errors.push(`Restaurant missing openingHours: ${restaurant._id}`);
  if (!restaurant.logo && !restaurant.imageUrl) {
    errors.push(`Restaurant missing image: ${restaurant._id}`);
  }
  if (hasPlaceholder(restaurant.logo) || hasPlaceholder(restaurant.imageUrl)) {
    errors.push(`Restaurant uses placeholder image: ${restaurant._id}`);
  }
  if (!restaurant.imageAlt) errors.push(`Restaurant missing imageAlt: ${restaurant._id}`);
  if (!restaurant.imageSource) errors.push(`Restaurant missing imageSource: ${restaurant._id}`);
  if (typeof restaurant.imageVerified !== 'boolean') {
    errors.push(`Restaurant missing imageVerified boolean: ${restaurant._id}`);
  }
  if (!restaurant.verificationStatus && typeof restaurant.verified !== 'boolean') {
    errors.push(`Restaurant missing verification metadata: ${restaurant._id}`);
  }
}

const dishIds = new Set();
const dishImages = new Set();

for (const dish of Object.values(mockDishes)) {
  if (!dish._id) errors.push(`Dish without _id: ${dish.name || 'unknown'}`);
  if (dishIds.has(dish._id)) errors.push(`Duplicate dish id: ${dish._id}`);
  dishIds.add(dish._id);

  if (!dish.name) errors.push(`Dish missing name: ${dish._id}`);
  if (!dish.description) errors.push(`Dish missing description: ${dish._id}`);
  if (!dish.category) errors.push(`Dish missing category: ${dish._id}`);
  if (typeof dish.price !== 'number') errors.push(`Dish missing numeric price: ${dish._id}`);
  if (!dish.currency) errors.push(`Dish missing currency: ${dish._id}`);
  if (!dish.image) errors.push(`Dish missing image: ${dish._id}`);
  if (hasPlaceholder(dish.image)) errors.push(`Dish uses placeholder image: ${dish._id}`);
  if (dishImages.has(dish.image)) errors.push(`Duplicate dish image: ${dish.image}`);
  dishImages.add(dish.image);
  if (!dish.imageAlt) errors.push(`Dish missing imageAlt: ${dish._id}`);
  if (!dish.imageSource) errors.push(`Dish missing imageSource: ${dish._id}`);
  if (typeof dish.imageVerified !== 'boolean') {
    errors.push(`Dish missing imageVerified boolean: ${dish._id}`);
  }
  if (!dish.restaurantName) errors.push(`Dish missing restaurantName: ${dish._id}`);
  if (!dish.city) errors.push(`Dish missing city: ${dish._id}`);

  if (!dish.restaurant?._id || !restaurantIds.has(dish.restaurant._id)) {
    errors.push(`Dish ${dish._id} references invalid restaurantId: ${dish.restaurant?._id || 'missing'}`);
  }
}

for (const restaurantId of restaurantIds) {
  if (!mockRestaurantDetails[restaurantId]) {
    errors.push(`Restaurant ${restaurantId} is missing a detail route mock`);
  }
}

for (const [detailId, detail] of Object.entries(mockRestaurantDetails)) {
  if (!restaurantIds.has(detailId)) {
    errors.push(`Restaurant detail has no matching restaurant: ${detailId}`);
  }
  if (!detail.coverImage) errors.push(`Restaurant detail missing coverImage: ${detailId}`);
}

for (const featuredDish of featuredDishes) {
  const routeId = String(featuredDish.mongoId || featuredDish.id);
  if (!dishIds.has(routeId)) {
    errors.push(`Featured dish points to missing detail route: ${routeId}`);
  }
}

if (errors.length > 0) {
  console.error('Data validation failed:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Data validation passed: ${mockRestaurants.length} restaurants, ${Object.keys(mockDishes).length} dishes.`
);
