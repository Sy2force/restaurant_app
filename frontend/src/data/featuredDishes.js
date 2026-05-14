/**
 * Featured dishes derived from canonical dishes.data.js
 * These are hand-picked popular dishes for landing page display
 */
import { dishes } from './dishes.data';

// Featured dish IDs (canonical IDs from dishes.data.js)
const FEATURED_DISH_IDS = [
  'dish_001', // Hummus Abu Hassan
  'dish_006', // HaKosem Falafel
  'dish_007', // Sabich Frishman
  'dish_008', // Dr Shakshuka
  'dish_010', // Miznon Shawarma
  'dish_018', // Machneyuda Eggplant Carpaccio
  'dish_020', // Mizlala Beef Tartare
  'dish_026', // Eucalyptus Lamb Shoulder
];

export const featuredDishes = dishes
  .filter((dish) => FEATURED_DISH_IDS.includes(dish.id))
  .map((dish) => ({
    id: dish.id,
    name: dish.name.en,
    nameFr: dish.name.fr,
    nameHe: dish.name.he,
    image: dish.image,
    restaurant: dish.restaurant.name,
    city: dish.restaurant.city,
    rating: dish.rating.average,
    isPopular: dish.isPopular,
    isChefChoice: dish.isChefChoice,
  }));

export default featuredDishes;
