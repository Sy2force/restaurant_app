/**
 * Safe translation helper.
 * - In production: never shows raw keys to users; renders human fallback.
 * - In development: warns in console for missing keys to help fixes.
 *
 * Usage:
 *   const safe = makeTSafe(t);
 *   safe('reservations.title', 'Réserver une table');
 */
const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;

export const makeTSafe = (t) => (key, fallback, options) => {
  if (typeof t !== 'function') return fallback ?? key ?? '';

  // i18next returns the key itself when the translation is missing.
  const value = t(key, options);

  if (typeof value !== 'string') return fallback ?? '';
  if (value === key) {
    if (isDev) {
      console.warn(`[i18n] Missing key "${key}", using fallback.`);
    }
    return fallback ?? humanizeKey(key);
  }
  return value;
};

/**
 * Convert "section.subsection.itemName" -> "Item Name" so users never see raw keys.
 */
export const humanizeKey = (key = '') => {
  const last = String(key).split('.').pop() || '';
  return last
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
};

/**
 * Picks a localised string from an object like { fr, en, he }.
 * Falls back to first available value, never returns null/undefined.
 */
export const pickLocale = (value, language = 'fr', fallback = '') => {
  if (value == null) return fallback;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    const lang = String(language || 'fr').split('-')[0];
    if (typeof value[lang] === 'string' && value[lang]) return value[lang];
    if (typeof value.fr === 'string' && value.fr) return value.fr;
    if (typeof value.en === 'string' && value.en) return value.en;
    if (typeof value.he === 'string' && value.he) return value.he;
    const first = Object.values(value).find((v) => typeof v === 'string' && v);
    return first || fallback;
  }
  return fallback;
};

export default makeTSafe;
