/**
 * Simple in-memory cache for Google Places API responses
 * Reduces API costs and improves performance
 */

class GooglePlacesCache {
  constructor() {
    this.cache = new Map();
    this.ttls = {
      search: 24 * 60 * 60 * 1000, // 24 hours for search results
      details: 7 * 24 * 60 * 60 * 1000, // 7 days for place details
      photo: 30 * 24 * 60 * 60 * 1000, // 30 days for photo URLs
    };
  }

  /**
   * Generate cache key
   */
  _generateKey(type, identifier, options = {}) {
    const opts = Object.keys(options).sort().map(k => `${k}:${options[k]}`).join('|');
    return `${type}:${identifier}${opts ? `:${opts}` : ''}`;
  }

  /**
   * Get cached value
   */
  get(type, identifier, options = {}) {
    const key = this._generateKey(type, identifier, options);
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set cached value
   */
  set(type, identifier, data, options = {}) {
    const key = this._generateKey(type, identifier, options);
    const ttl = this.ttls[type] || this.ttls.search;

    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttl,
    });
  }

  /**
   * Delete cached value
   */
  delete(type, identifier, options = {}) {
    const key = this._generateKey(type, identifier, options);
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Clear expired entries
   */
  clearExpired() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache stats
   */
  getStats() {
    const now = Date.now();
    let total = 0;
    let expired = 0;
    let active = 0;

    for (const entry of this.cache.values()) {
      total++;
      if (now > entry.expiresAt) {
        expired++;
      } else {
        active++;
      }
    }

    return { total, expired, active };
  }
}

// Export singleton instance
module.exports = new GooglePlacesCache();
