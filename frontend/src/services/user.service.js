import { authAPI, usersAPI } from './api';

/**
 * User service: encapsulates calls to the backend (auth + users).
 * Wraps responses with a consistent shape and tolerates failures.
 */

export const getCurrentProfile = async () => {
  try {
    const res = await authAPI.getProfile();
    return { success: true, user: res?.data?.user || res?.data || null };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateProfile = async (data) => {
  try {
    const res = await authAPI.updateProfile(data);
    return { success: true, user: res?.data?.user || res?.data || null };
  } catch (error) {
    return { success: false, error };
  }
};

export const uploadAvatar = async (file) => {
  if (!file) return { success: false, error: new Error('No file provided') };
  const formData = new FormData();
  formData.append('avatar', file);
  try {
    const res = await authAPI.uploadAvatar(formData);
    return { success: true, avatarUrl: res?.data?.avatar || res?.data?.url || null };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteAvatar = async () => {
  try {
    await authAPI.deleteAvatar();
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const getDashboardStats = async () => {
  try {
    const res = await authAPI.getDashboardStats();
    return { success: true, stats: res?.data || null };
  } catch (error) {
    return { success: false, error };
  }
};

export const getFavorites = async () => {
  try {
    const res = await usersAPI.getFavorites();
    return { success: true, favorites: res?.data || null };
  } catch (error) {
    return { success: false, error };
  }
};

export const addToFavorites = async (type, itemId) => {
  try {
    const res = await authAPI.addToFavorites(type, itemId);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, error };
  }
};

export const removeFromFavorites = async (type, itemId) => {
  try {
    const res = await authAPI.removeFromFavorites(type, itemId);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, error };
  }
};

export default {
  getCurrentProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  getDashboardStats,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
};
