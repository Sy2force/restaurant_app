import { restaurantAPI } from './api';
import { mockRestaurants } from '../data/mockRestaurants';
import { getSafeImage } from '../data/images.registry';

/**
 * Restaurant service: tries the real API first, falls back to local mock data.
 * Always returns sanitised objects (no undefined critical fields).
 */

const normalize = (r) => {
  if (!r) return null;
  return {
    _id: r._id || r.id || r.slug,
    slug:
      r.slug ||
      String(r.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    name: r.name || 'Restaurant',
    description: r.description || '',
    coverImage: getSafeImage(r.coverImage || r.imageUrl, 'restaurant'),
    imageUrl: getSafeImage(r.coverImage || r.imageUrl, 'restaurant'),
    logo: getSafeImage(r.logo || r.imageUrl, 'restaurant'),
    address: r.address || {},
    city: r.address?.city || r.city || '',
    phone: r.phone || '',
    website: r.website || '',
    cacherout: r.cacherout || 'Rabbanout',
    cuisine: Array.isArray(r.cuisine) ? r.cuisine : r.cuisineType ? [r.cuisineType] : [],
    cuisineType: r.cuisineType || (Array.isArray(r.cuisine) ? r.cuisine[0] : null) || '',
    tags: Array.isArray(r.tags) ? r.tags : [],
    rating: r.rating || { average: 0, count: 0 },
    priceRange: r.priceRange || '₪₪',
    openingHours: r.openingHours || null,
    reservationAvailable: r.reservationAvailable !== false,
    isFeatured: !!r.isFeatured,
    isPopular: !!r.isPopular,
    isNew: !!r.isNew,
    mapUrl: r.mapUrl || '',
  };
};

export const getAllRestaurants = async () => {
  try {
    const res = await restaurantAPI.getAll();
    if (Array.isArray(res?.data) && res.data.length > 0) {
      return res.data.map(normalize);
    }
  } catch {
    // network or 404 → fallback
  }
  return mockRestaurants.map(normalize);
};

export const getFeaturedRestaurants = async (limit = 6) => {
  const all = await getAllRestaurants();
  const featured = all.filter((r) => r.isFeatured);
  return (featured.length ? featured : all.slice(0, limit)).slice(0, limit);
};

export const getPopularRestaurants = async (limit = 8) => {
  const all = await getAllRestaurants();
  const popular = [...all].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
  return popular.slice(0, limit);
};

export const getRestaurantById = async (id) => {
  if (!id) return null;
  try {
    const res = await restaurantAPI.getById(id);
    if (res?.data) return normalize(res.data);
  } catch {
    // fallback below
  }
  const all = await getAllRestaurants();
  return all.find((r) => r._id === id || r.slug === id) || null;
};

export const getRestaurantBySlug = async (slug) => {
  if (!slug) return null;
  const all = await getAllRestaurants();
  return all.find((r) => r.slug === slug || r._id === slug) || null;
};

export const getRestaurantsByCity = async (city) => {
  if (!city) return [];
  const all = await getAllRestaurants();
  const target = String(city).toLowerCase();
  return all.filter((r) => String(r.city || '').toLowerCase() === target);
};

export const getRestaurantsByKosherLevel = async (level) => {
  if (!level) return [];
  const all = await getAllRestaurants();
  return all.filter((r) => r.cacherout === level);
};

export const searchRestaurants = async (query) => {
  if (!query) return [];
  const all = await getAllRestaurants();
  const q = String(query).toLowerCase();
  return all.filter(
    (r) =>
      String(r.name || '')
        .toLowerCase()
        .includes(q) ||
      String(r.description || '')
        .toLowerCase()
        .includes(q) ||
      String(r.city || '')
        .toLowerCase()
        .includes(q) ||
      (r.cuisine || []).some((c) => String(c).toLowerCase().includes(q))
  );
};

export const filterRestaurants = async (filters = {}) => {
  const all = await getAllRestaurants();
  return all.filter((r) => {
    if (filters.city && String(r.city || '').toLowerCase() !== String(filters.city).toLowerCase())
      return false;
    if (filters.cacherout && r.cacherout !== filters.cacherout) return false;
    if (filters.cuisine && !(r.cuisine || []).includes(filters.cuisine)) return false;
    if (filters.priceRange && r.priceRange !== filters.priceRange) return false;
    if (filters.minRating && (r.rating?.average || 0) < Number(filters.minRating)) return false;
    if (filters.search) {
      const q = String(filters.search).toLowerCase();
      const haystack =
        `${r.name} ${r.description} ${r.city} ${(r.cuisine || []).join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
};

export const getRelatedRestaurants = async (restaurantId, limit = 4) => {
  const target = await getRestaurantById(restaurantId);
  if (!target) return [];
  const all = await getAllRestaurants();
  return all
    .filter((r) => r._id !== target._id)
    .filter(
      (r) =>
        r.city === target.city || (target.cuisine || []).some((c) => (r.cuisine || []).includes(c))
    )
    .slice(0, limit);
};

export default {
  getAllRestaurants,
  getFeaturedRestaurants,
  getPopularRestaurants,
  getRestaurantById,
  getRestaurantBySlug,
  getRestaurantsByCity,
  getRestaurantsByKosherLevel,
  searchRestaurants,
  filterRestaurants,
  getRelatedRestaurants,
};
