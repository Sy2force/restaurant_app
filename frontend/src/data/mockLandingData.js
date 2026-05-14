/**
 * Landing page data derived from canonical sources
 * Recipes, restaurants, and stats are derived from canonical data files
 */
import { restaurants } from './restaurants.data';
import { dishes } from './dishes.data';

// Featured restaurant IDs (canonical IDs from restaurants.data.js)
const FEATURED_RESTAURANT_IDS = [
  'rest_001', // Mizlala
  'rest_009', // Machneyuda
  'rest_011', // The Eucalyptus
];

// Featured recipe data (these are actual recipes, not dishes)
// These are separate from dishes as they include cooking instructions
export const popularRecipes = [
  {
    id: 1,
    title: 'La Challah du Shabbat',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2942',
    time: '2h30',
    servings: 8,
    difficulty: 'medium',
  },
  {
    id: 2,
    title: 'Couscous Royal Israélien',
    image: 'https://images.unsplash.com/photo-1644365319888-59c44510b656?q=80&w=2864',
    time: '45min',
    servings: 4,
    difficulty: 'easy',
  },
  {
    id: 3,
    title: 'Baklava Pistache & Miel',
    image: 'https://images.unsplash.com/photo-1565977935492-35d64e9c7456?q=80&w=2940',
    time: '1h30',
    servings: 12,
    difficulty: 'hard',
  },
];

// Featured restaurants derived from canonical restaurants.data.js
export const featuredRestaurants = restaurants
  .filter((restaurant) => FEATURED_RESTAURANT_IDS.includes(restaurant.id))
  .map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    image: restaurant.image,
    city: restaurant.city,
    kosher: restaurant.kosherLevel,
    rating: restaurant.rating?.average || 0,
    cuisine: restaurant.cuisineType,
  }));

// Landing stats derived from actual data counts
export const landingStats = {
  dishes: dishes.length,
  restaurants: restaurants.length,
  recipes: popularRecipes.length,
  users: 2300, // This would come from actual user data in production
};
