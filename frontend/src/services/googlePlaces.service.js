import api from './api';

const GOOGLE_PLACES_BASE = '/google-places';

export const googlePlacesAPI = {
  /**
   * Search restaurants via Google Places API
   * Public endpoint (no auth required)
   */
  search: (query, city = 'Israel') =>
    api.get(`${GOOGLE_PLACES_BASE}/search`, {
      params: { query, city },
    }),

  /**
   * Get detailed information about a place
   * Public endpoint (no auth required)
   */
  getDetails: (placeId) => api.get(`${GOOGLE_PLACES_BASE}/details/${placeId}`),

  /**
   * Get photo URL from Google Places
   * Public endpoint (no auth required)
   */
  getPhoto: (photoName, maxWidth = 1200) =>
    api.get(`${GOOGLE_PLACES_BASE}/photo`, {
      params: { photoName, maxWidth },
    }),

  /**
   * Import a restaurant from Google Places
   * Requires business or admin authentication
   */
  importPlace: (placeId) => api.post(`${GOOGLE_PLACES_BASE}/import/${placeId}`),

  /**
   * Bulk import restaurants from a list
   * Requires admin authentication
   */
  bulkImport: (restaurants) => api.post(`${GOOGLE_PLACES_BASE}/bulk-import`, { restaurants }),

  /**
   * Get import statistics
   * Requires admin authentication
   */
  getStats: () => api.get(`${GOOGLE_PLACES_BASE}/stats`),
};

export default googlePlacesAPI;
