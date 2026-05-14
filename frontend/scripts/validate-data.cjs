#!/usr/bin/env node

/**
 * Data Validation Script
 * Validates mock data for duplicates, missing references, and image paths
 */

const fs = require('fs');
const path = require('path');

// Import data files
const dishesDataPath = path.join(__dirname, '../src/data/dishes.data.js');
const restaurantsDataPath = path.join(__dirname, '../src/data/restaurants.data.js');
const imagesRegistryPath = path.join(__dirname, '../src/data/images.registry.js');

// Read and parse data files
function parseDataFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract the exported array/object
  const exportMatch = content.match(/export const (?:dishes|restaurants|DISH_IMAGES|RESTAURANT_IMAGES) = (\[.*?\]|\{.*?\});/s);
  if (!exportMatch) {
    return null;
  }
  
  try {
    return eval(`(${exportMatch[1]})`);
  } catch (e) {
    return null;
  }
}

// Load data
let dishes = [];
let restaurants = [];
let dishImages = {};
let restaurantImages = {};

try {
  const dishesContent = fs.readFileSync(dishesDataPath, 'utf-8');
  const dishesMatch = dishesContent.match(/export const dishes = (\[.*?\]);/s);
  if (dishesMatch) {
    dishes = eval(`(${dishesMatch[1]})`);
  }
} catch (e) {
  console.log('❌ Error loading dishes.data.js:', e.message);
}

try {
  const restaurantsContent = fs.readFileSync(restaurantsDataPath, 'utf-8');
  const restaurantsMatch = restaurantsContent.match(/export const restaurants = (\[.*?\]);/s);
  if (restaurantsMatch) {
    restaurants = eval(`(${restaurantsMatch[1]})`);
  }
} catch (e) {
  console.log('❌ Error loading restaurants.data.js:', e.message);
}

// Validation results
const results = {
  errors: [],
  warnings: [],
  passed: []
};

// Helper to log results
function log(type, message) {
  const icon = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
  console.log(`${icon} ${message}`);
  results[type === 'error' ? 'errors' : type === 'warning' ? 'warnings' : 'passed'].push(message);
}

// 1. Check for duplicate dish IDs
console.log('\n=== Checking duplicate dish IDs ===');
const dishIds = new Map();
dishes.forEach(dish => {
  if (dishIds.has(dish.id)) {
    log('error', `Duplicate dish ID: ${dish.id}`);
  } else {
    dishIds.set(dish.id, dish);
  }
});
if (dishIds.size === dishes.length) {
  log('passed', `No duplicate dish IDs (${dishes.length} dishes)`);
}

// 2. Check for duplicate restaurant IDs
console.log('\n=== Checking duplicate restaurant IDs ===');
const restaurantIds = new Map();
restaurants.forEach(restaurant => {
  if (restaurantIds.has(restaurant.id)) {
    log('error', `Duplicate restaurant ID: ${restaurant.id}`);
  } else {
    restaurantIds.set(restaurant.id, restaurant);
  }
});
if (restaurantIds.size === restaurants.length) {
  log('passed', `No duplicate restaurant IDs (${restaurants.length} restaurants)`);
}

// 3. Check for dishes with invalid restaurantId
console.log('\n=== Checking dish restaurantId references ===');
const restaurantIdSet = new Set(restaurants.map(r => r.id));
let invalidRestaurantIds = 0;
dishes.forEach(dish => {
  if (!restaurantIdSet.has(dish.restaurantId)) {
    log('error', `Dish "${dish.id}" has invalid restaurantId: ${dish.restaurantId}`);
    invalidRestaurantIds++;
  }
});
if (invalidRestaurantIds === 0) {
  log('passed', `All dishes have valid restaurantId references`);
}

// 4. Check for dishes without images
console.log('\n=== Checking dish images ===');
let dishesWithoutImages = 0;
dishes.forEach(dish => {
  if (!dish.image || dish.image === '') {
    log('warning', `Dish "${dish.id}" (${dish.name?.en || 'unknown'}) has no image`);
    dishesWithoutImages++;
  }
});
if (dishesWithoutImages === 0) {
  log('passed', `All dishes have images`);
}

// 5. Check for restaurants without images
console.log('\n=== Checking restaurant images ===');
let restaurantsWithoutImages = 0;
restaurants.forEach(restaurant => {
  if (!restaurant.image || restaurant.image === '') {
    log('warning', `Restaurant "${restaurant.id}" (${restaurant.name}) has no image`);
    restaurantsWithoutImages++;
  }
});
if (restaurantsWithoutImages === 0) {
  log('passed', `All restaurants have images`);
}

// 6. Check for problematic image paths
console.log('\n=== Checking image paths ===');
const problematicPaths = ['src/assets', '../assets', 'public/images', 'file:///'];
let problematicImageCount = 0;
dishes.forEach(dish => {
  if (dish.image && problematicPaths.some(p => dish.image.includes(p))) {
    log('error', `Dish "${dish.id}" has problematic image path: ${dish.image}`);
    problematicImageCount++;
  }
});
restaurants.forEach(restaurant => {
  if (restaurant.image && problematicPaths.some(p => restaurant.image.includes(p))) {
    log('error', `Restaurant "${restaurant.id}" has problematic image path: ${restaurant.image}`);
    problematicImageCount++;
  }
});
if (problematicImageCount === 0) {
  log('passed', `No problematic image paths`);
}

// 7. Check for missing multilingual data
console.log('\n=== Checking multilingual data ===');
let missingTranslations = 0;
dishes.forEach(dish => {
  if (!dish.name || !dish.name.en || !dish.name.fr || !dish.name.he) {
    log('warning', `Dish "${dish.id}" missing complete name translations`);
    missingTranslations++;
  }
  if (!dish.description || !dish.description.en || !dish.description.fr || !dish.description.he) {
    log('warning', `Dish "${dish.id}" missing complete description translations`);
    missingTranslations++;
  }
});
if (missingTranslations === 0) {
  log('passed', `All dishes have complete FR/EN/HE translations`);
}

// 8. Check for missing dietary information
console.log('\n=== Checking dietary information ===');
let missingDietaryInfo = 0;
dishes.forEach(dish => {
  if (dish.isVegetarian === undefined || dish.isVegan === undefined || dish.isGlutenFree === undefined) {
    log('warning', `Dish "${dish.id}" missing dietary flags`);
    missingDietaryInfo++;
  }
});
if (missingDietaryInfo === 0) {
  log('passed', `All dishes have dietary information`);
}

// Summary
console.log('\n=== VALIDATION SUMMARY ===');
console.log(`✅ Passed: ${results.passed.length}`);
console.log(`⚠️  Warnings: ${results.warnings.length}`);
console.log(`❌ Errors: ${results.errors.length}`);

if (results.errors.length > 0) {
  console.log('\n❌ Validation FAILED - Fix errors before proceeding');
  process.exit(1);
} else if (results.warnings.length > 0) {
  console.log('\n⚠️  Validation passed with warnings - Review warnings');
  process.exit(0);
} else {
  console.log('\n✅ Validation PASSED - All checks successful');
  process.exit(0);
}
