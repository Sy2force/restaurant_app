#!/usr/bin/env node
/**
 * Data Validation Script (ES Module)
 *
 * Verifies in depth:
 *  - Duplicate restaurant / dish IDs
 *  - Each dish.restaurantId references an existing restaurant
 *  - dish.restaurant.{name,city,cacherout} match the parent restaurant
 *  - Each dish.image visually matches its dish category/keywords
 *  - Each restaurant has a non-empty cover/logo image
 *  - No problematic local image paths
 *  - FR/EN/HE translations are present
 *
 * Usage:  node scripts/validate-data.mjs
 */

import { dishes } from '../src/data/dishes.data.js';
import { restaurants } from '../src/data/restaurants.data.js';
import { DISH_IMAGES, RESTAURANT_IMAGES } from '../src/data/images.registry.js';

const errors = [];
const warnings = [];
const passed = [];

const log = (type, message) => {
  const icon = type === 'error' ? '❌' : type === 'warning' ? '⚠️ ' : '✅';
  console.log(`${icon} ${message}`);
  if (type === 'error') errors.push(message);
  else if (type === 'warning') warnings.push(message);
  else passed.push(message);
};

// 1. Duplicate IDs
console.log('\n=== Duplicate IDs ===');
const seenDishIds = new Set();
dishes.forEach((d) => {
  if (seenDishIds.has(d.id)) log('error', `Duplicate dish id: ${d.id}`);
  seenDishIds.add(d.id);
});
if (seenDishIds.size === dishes.length)
  log('passed', `No duplicate dish IDs (${dishes.length} dishes)`);

const seenRestaurantIds = new Set();
restaurants.forEach((r) => {
  if (seenRestaurantIds.has(r.id)) log('error', `Duplicate restaurant id: ${r.id}`);
  seenRestaurantIds.add(r.id);
});
if (seenRestaurantIds.size === restaurants.length)
  log('passed', `No duplicate restaurant IDs (${restaurants.length} restaurants)`);

// 2. restaurantId references
console.log('\n=== Dish.restaurantId references ===');
const restaurantById = new Map(restaurants.map((r) => [r.id, r]));
let badRefs = 0;
dishes.forEach((d) => {
  if (!restaurantById.has(d.restaurantId)) {
    log('error', `Dish ${d.id} references unknown restaurantId ${d.restaurantId}`);
    badRefs++;
  }
});
if (badRefs === 0) log('passed', 'All dishes reference an existing restaurant');

// 3. dish.restaurant snapshot consistency
console.log('\n=== Dish.restaurant snapshot consistency ===');
let snapshotIssues = 0;
dishes.forEach((d) => {
  const r = restaurantById.get(d.restaurantId);
  if (!r) return;
  if (d.restaurant?.name !== r.name) {
    log(
      'error',
      `Dish ${d.id} (${d.name?.en}) has restaurant.name "${d.restaurant?.name}" but parent restaurant ${r.id} is "${r.name}"`
    );
    snapshotIssues++;
  }
  if (d.restaurant?.city !== r.city) {
    log(
      'error',
      `Dish ${d.id} (${d.name?.en}) has restaurant.city "${d.restaurant?.city}" but parent restaurant ${r.id} is in "${r.city}"`
    );
    snapshotIssues++;
  }
  if (d.restaurant?.cacherout !== r.cacherout) {
    log(
      'warning',
      `Dish ${d.id} (${d.name?.en}) cacherout "${d.restaurant?.cacherout}" differs from restaurant ${r.id} "${r.cacherout}"`
    );
  }
});
if (snapshotIssues === 0) log('passed', 'All dish.restaurant snapshots match their parent restaurant');

// 4. Image presence and validity
console.log('\n=== Image presence ===');
const dishImageValues = new Set(Object.values(DISH_IMAGES));
const restaurantImageValues = new Set(Object.values(RESTAURANT_IMAGES));
const problematicPaths = ['src/assets', '../assets', 'public/images', 'file:///'];

let dishImageIssues = 0;
dishes.forEach((d) => {
  if (!d.image) {
    log('error', `Dish ${d.id} (${d.name?.en}) has no image`);
    dishImageIssues++;
    return;
  }
  if (problematicPaths.some((p) => d.image.includes(p))) {
    log('error', `Dish ${d.id} uses problematic local path: ${d.image}`);
    dishImageIssues++;
  }
});
if (dishImageIssues === 0) log('passed', 'All dishes have a valid image URL');

let restaurantImageIssues = 0;
restaurants.forEach((r) => {
  const img = r.coverImage || r.imageUrl || r.logo;
  if (!img) {
    log('error', `Restaurant ${r.id} (${r.name}) has no cover/logo image`);
    restaurantImageIssues++;
    return;
  }
  if (problematicPaths.some((p) => img.includes(p))) {
    log('error', `Restaurant ${r.id} uses problematic local path: ${img}`);
    restaurantImageIssues++;
  }
});
if (restaurantImageIssues === 0) log('passed', 'All restaurants have a valid cover image');

// 4b. Image collisions across actual records (not just registry aliases)
console.log('\n=== Image collisions across records ===');
const dishImageMap = new Map();
let dishCollisions = 0;
dishes.forEach((d) => {
  if (!d.image) return;
  if (!dishImageMap.has(d.image)) dishImageMap.set(d.image, []);
  dishImageMap.get(d.image).push(`${d.id} (${d.name?.en})`);
});
dishImageMap.forEach((ids) => {
  if (ids.length > 1) {
    log('error', `Same image used by multiple dishes: ${ids.join(' / ')}`);
    dishCollisions++;
  }
});
if (dishCollisions === 0) log('passed', 'No two dishes share the same image URL');

const restImageMap = new Map();
let restCollisions = 0;
restaurants.forEach((r) => {
  const img = r.coverImage || r.imageUrl;
  if (!img) return;
  if (!restImageMap.has(img)) restImageMap.set(img, []);
  restImageMap.get(img).push(`${r.id} (${r.name})`);
});
restImageMap.forEach((ids) => {
  if (ids.length > 1) {
    log('error', `Same cover image used by multiple restaurants: ${ids.join(' / ')}`);
    restCollisions++;
  }
});
if (restCollisions === 0) log('passed', 'No two restaurants share the same cover image URL');

// 5. Image-vs-name semantic check (heuristic)
console.log('\n=== Dish image vs dish name (heuristic) ===');
// Map dish slug/name keywords -> expected DISH_IMAGES key
const keywordMap = [
  { keywords: ['hummus-bassar', 'hummus bassar', 'hummus meat'], expected: 'hummus_meat' },
  { keywords: ['hummus-mushroom', 'mushroom hummus'], expected: 'hummus_mushroom' },
  { keywords: ['hummus'], expected: 'hummus' },
  { keywords: ['baba-ganoush', 'baba ganoush'], expected: 'baba_ganoush' },
  { keywords: ['halva'], expected: 'halva' },
  { keywords: ['tahini'], expected: 'tahini_plate' },
  { keywords: ['falafel'], expected: 'falafel' },
  { keywords: ['sabich'], expected: 'sabich' },
  { keywords: ['shakshuka-green', 'green shakshuka'], expected: 'shakshuka_green' },
  { keywords: ['shakshuka'], expected: 'shakshuka' },
  { keywords: ['shawarma'], expected: 'shawarma' },
  { keywords: ['cauliflower'], expected: 'pita_filled' },
  { keywords: ['bourekas', 'burekas'], expected: 'bourekas' },
  { keywords: ['jachnun', "jachnoun"], expected: 'jachnun' },
  { keywords: ['israeli-salad', 'israeli salad'], expected: 'israeli_salad' },
  { keywords: ['tabouleh'], expected: 'tabouleh' },
  { keywords: ['arabic-salad', 'arabic salad'], expected: 'arabic_salad' },
  { keywords: ['fattoush'], expected: 'fattoush' },
  { keywords: ['beetroot'], expected: 'beetroot_salad' },
  { keywords: ['eggplant-carpaccio', 'eggplant carpaccio'], expected: 'eggplant_carpaccio' },
  { keywords: ['beef-carpaccio', 'beef carpaccio'], expected: 'beef_carpaccio' },
  { keywords: ['tartare'], expected: 'tartare' },
  { keywords: ['foie-gras', 'foie gras'], expected: 'foie_gras' },
  { keywords: ['jerusalem-grill', 'mixed grill', 'jerusalem mixed'], expected: 'jerusalem_grill' },
  { keywords: ['schnitzel'], expected: 'schnitzel' },
  { keywords: ['entrecote', 'entrecôte'], expected: 'entrecote' },
  { keywords: ['lamb-kebab', 'lamb kebab'], expected: 'lamb_kebab' },
  { keywords: ['lamb-shoulder', 'lamb shoulder'], expected: 'lamb_shoulder' },
  { keywords: ['chicken-skewer', 'chicken skewer'], expected: 'chicken_skewer' },
  { keywords: ['ribs'], expected: 'ribs' },
  { keywords: ['short-rib', 'short rib'], expected: 'beef_short_rib' },
  { keywords: ['sea-bass', 'sea bass'], expected: 'sea_bass' },
  { keywords: ['grilled-fish', 'grilled fish'], expected: 'grilled_fish' },
  { keywords: ['salmon'], expected: 'salmon_tartare' },
  { keywords: ['shrimp', 'pasta'], expected: 'shrimp_pasta' },
  { keywords: ['ceviche'], expected: 'ceviche' },
  { keywords: ['vegan-bowl', 'vegan bowl'], expected: 'vegan_bowl' },
  { keywords: ['vegetable-couscous', 'couscous'], expected: 'vegetable_couscous' },
  { keywords: ['stuffed-pepper'], expected: 'stuffed_pepper' },
  { keywords: ['shakarout'], expected: 'shakarout' },
  { keywords: ['challah'], expected: 'challah_french_toast' },
  { keywords: ['yogurt'], expected: 'fresh_yogurt' },
  { keywords: ['kobaneh'], expected: 'kobaneh' },
  { keywords: ['malabi'], expected: 'malabi' },
  { keywords: ['knafeh'], expected: 'knafeh' },
  { keywords: ['baklava'], expected: 'baklava' },
  { keywords: ['halva'], expected: 'halva_cake' },
  { keywords: ['chocolate'], expected: 'chocolate_dome' },
  { keywords: ['tasting-menu', 'tasting menu'], expected: 'tasting_menu' },
  { keywords: ['truffle'], expected: 'truffle_pasta' },
];

let mismatches = 0;
dishes.forEach((d) => {
  const haystack = `${d.slug || ''} ${d.name?.en || ''} ${d.name?.fr || ''}`.toLowerCase();
  let matched = null;
  for (const rule of keywordMap) {
    if (rule.keywords.some((k) => haystack.includes(k.toLowerCase()))) {
      matched = rule;
      break;
    }
  }
  if (!matched) return; // unknown category, skip
  const expectedUrl = DISH_IMAGES[matched.expected];
  if (!expectedUrl) return;
  if (d.image !== expectedUrl) {
    log(
      'warning',
      `Dish ${d.id} "${d.name?.en}" image does not match expected DISH_IMAGES.${matched.expected}`
    );
    mismatches++;
  }
});
if (mismatches === 0) log('passed', 'All dish images match their expected category by keyword');

// 6. Hero image of restaurants must come from RESTAURANT_IMAGES values
console.log('\n=== Restaurant cover image registry ===');
let unknownRestaurantImages = 0;
restaurants.forEach((r) => {
  const img = r.coverImage || r.imageUrl || r.logo;
  if (img && !restaurantImageValues.has(img) && !dishImageValues.has(img)) {
    log('warning', `Restaurant ${r.id} (${r.name}) image is not in registry: ${img}`);
    unknownRestaurantImages++;
  }
});
if (unknownRestaurantImages === 0)
  log('passed', 'All restaurant cover images come from images.registry.js');

// 7. Translations
console.log('\n=== Multilingual data ===');
let translationIssues = 0;
dishes.forEach((d) => {
  if (!d.name?.fr || !d.name?.en || !d.name?.he) {
    log('warning', `Dish ${d.id} missing FR/EN/HE name`);
    translationIssues++;
  }
  if (!d.description?.fr || !d.description?.en || !d.description?.he) {
    log('warning', `Dish ${d.id} missing FR/EN/HE description`);
    translationIssues++;
  }
});
if (translationIssues === 0) log('passed', 'All dishes have FR/EN/HE name + description');

// 8. Restaurant has at least one dish?
console.log('\n=== Restaurants with at least 1 dish ===');
const dishesByRestaurant = new Map();
dishes.forEach((d) => {
  if (!dishesByRestaurant.has(d.restaurantId)) dishesByRestaurant.set(d.restaurantId, 0);
  dishesByRestaurant.set(d.restaurantId, dishesByRestaurant.get(d.restaurantId) + 1);
});
let emptyRestaurants = 0;
restaurants.forEach((r) => {
  const count = dishesByRestaurant.get(r.id) || 0;
  if (count === 0) {
    log('warning', `Restaurant ${r.id} (${r.name}) has 0 associated dishes`);
    emptyRestaurants++;
  }
});
if (emptyRestaurants === 0) log('passed', 'Every restaurant has at least one dish');
else log('passed', `${restaurants.length - emptyRestaurants}/${restaurants.length} restaurants have dishes`);

// Summary
console.log('\n=== VALIDATION SUMMARY ===');
console.log(`✅ Passed:   ${passed.length}`);
console.log(`⚠️  Warnings: ${warnings.length}`);
console.log(`❌ Errors:   ${errors.length}`);

if (errors.length > 0) {
  console.log('\n❌ Validation FAILED – fix the errors above');
  process.exit(1);
}
if (warnings.length > 0) {
  console.log('\n⚠️  Validation passed with warnings – review them above');
  process.exit(0);
}
console.log('\n✅ Validation PASSED – data is consistent');
process.exit(0);
