import { dishAPI } from './api';
import { mockDishes } from '../data/mockDishes';
import { getSafeImage } from '../data/images.registry';

const normalize = (d) => {
  if (!d) return null;
  const restaurantId = d.restaurantId || d.restaurant?._id || null;
  return {
    _id: d._id || d.id || d.slug,
    slug:
      d.slug ||
      String(d.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    name: d.name || 'Plat',
    description: d.description || '',
    image: getSafeImage(d.image, 'dish'),
    price: typeof d.price === 'number' ? d.price : 0,
    category: d.category || '',
    cacherout: d.cacherout || 'Rabbanout',
    isVegetarian: !!d.isVegetarian,
    isVegan: !!d.isVegan,
    isGlutenFree: !!d.isGlutenFree,
    spicyLevel: typeof d.spicyLevel === 'number' ? d.spicyLevel : 0,
    rating: d.rating || { average: 0, count: 0 },
    region: d.region || '',
    season: d.season || '',
    restaurantId,
    restaurant: d.restaurant || null,
    isPopular: !!d.isPopular,
    isChefChoice: !!d.isChefChoice,
    isNew: !!d.isNew,
    ingredients: Array.isArray(d.ingredients) ? d.ingredients : [],
    allergens: Array.isArray(d.allergens) ? d.allergens : [],
  };
};

const dishesArray = () => Object.values(mockDishes || {});

export const getAllDishes = async () => {
  try {
    const res = await dishAPI.getAll();
    if (Array.isArray(res?.data) && res.data.length > 0) {
      return res.data.map(normalize);
    }
  } catch {
    // fallback
  }
  return dishesArray().map(normalize);
};

export const getPopularDishes = async (limit = 8) => {
  const all = await getAllDishes();
  return [...all]
    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    .slice(0, limit);
};

export const getDishById = async (id) => {
  if (!id) return null;
  try {
    const res = await dishAPI.getById(id);
    if (res?.data) return normalize(res.data);
  } catch {
    // fallback
  }
  const all = await getAllDishes();
  return all.find((d) => d._id === id || d.slug === id) || null;
};

export const getDishBySlug = async (slug) => {
  if (!slug) return null;
  const all = await getAllDishes();
  return all.find((d) => d.slug === slug || d._id === slug) || null;
};

export const getDishesByRestaurantId = async (restaurantId) => {
  if (!restaurantId) return [];
  const all = await getAllDishes();
  return all.filter((d) => d.restaurantId === restaurantId || d.restaurant?._id === restaurantId);
};

export const filterDishes = async (filters = {}) => {
  const all = await getAllDishes();
  return all.filter((d) => {
    if (filters.category && d.category !== filters.category) return false;
    if (filters.cacherout && d.cacherout !== filters.cacherout) return false;
    if (filters.isVegetarian && !d.isVegetarian) return false;
    if (filters.isVegan && !d.isVegan) return false;
    if (filters.isGlutenFree && !d.isGlutenFree) return false;
    if (filters.maxPrice && d.price > Number(filters.maxPrice)) return false;
    if (filters.minRating && (d.rating?.average || 0) < Number(filters.minRating)) return false;
    if (filters.search) {
      const q = String(filters.search).toLowerCase();
      const haystack = `${d.name} ${d.description} ${d.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
};

export const getRelatedDishes = async (dishId, limit = 4) => {
  const target = await getDishById(dishId);
  if (!target) return [];
  const all = await getAllDishes();
  return all
    .filter((d) => d._id !== target._id)
    .filter((d) => d.category === target.category || d.restaurantId === target.restaurantId)
    .slice(0, limit);
};

export default {
  getAllDishes,
  getPopularDishes,
  getDishById,
  getDishBySlug,
  getDishesByRestaurantId,
  filterDishes,
  getRelatedDishes,
};
