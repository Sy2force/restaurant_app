import { mockRestaurants } from '../frontend/src/data/mockRestaurants.js';
import { mockDishes } from '../frontend/src/data/mockDishes.js';

const errors = [];

const restaurantIds = new Set();
for (const restaurant of mockRestaurants) {
  if (!restaurant._id) errors.push(`Restaurant without _id: ${restaurant.name || 'unknown'}`);
  if (restaurantIds.has(restaurant._id)) errors.push(`Duplicate restaurant id: ${restaurant._id}`);
  restaurantIds.add(restaurant._id);

  if (!restaurant.address?.city) errors.push(`Restaurant missing city: ${restaurant._id}`);
  if (!restaurant.logo) errors.push(`Restaurant missing image (logo): ${restaurant._id}`);
}

const dishIds = new Set();
const dishImages = new Set();

for (const dish of Object.values(mockDishes)) {
  if (!dish._id) errors.push(`Dish without _id: ${dish.name || 'unknown'}`);
  if (dishIds.has(dish._id)) errors.push(`Duplicate dish id: ${dish._id}`);
  dishIds.add(dish._id);

  if (!dish.image) errors.push(`Dish missing image: ${dish._id}`);
  if (dishImages.has(dish.image)) errors.push(`Duplicate dish image: ${dish.image}`);
  dishImages.add(dish.image);

  if (!dish.restaurant?._id || !restaurantIds.has(dish.restaurant._id)) {
    errors.push(`Dish ${dish._id} references invalid restaurantId: ${dish.restaurant?._id || 'missing'}`);
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
