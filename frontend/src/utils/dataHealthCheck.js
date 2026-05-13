import { validateUniqueImages } from '../data/images.registry';

const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;

const REQUIRED_RESTAURANT_FIELDS = ['_id', 'name'];
const REQUIRED_DISH_FIELDS = ['_id', 'name'];

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

export const validateRestaurants = (restaurants = []) => {
  const issues = [];
  const slugs = new Set();
  const ids = new Set();

  restaurants.forEach((r, idx) => {
    REQUIRED_RESTAURANT_FIELDS.forEach((field) => {
      if (!r?.[field]) {
        issues.push({ kind: 'missing_field', field, index: idx, id: r?._id });
      }
    });
    if (r?._id) {
      if (ids.has(r._id)) {
        issues.push({ kind: 'duplicate_id', id: r._id, index: idx });
      } else {
        ids.add(r._id);
      }
    }
    if (r?.slug) {
      if (slugs.has(r.slug)) {
        issues.push({ kind: 'duplicate_slug', slug: r.slug, index: idx });
      } else {
        slugs.add(r.slug);
      }
    }
    if (
      !isNonEmptyString(r?.coverImage) &&
      !isNonEmptyString(r?.imageUrl) &&
      !isNonEmptyString(r?.logo)
    ) {
      issues.push({ kind: 'no_image', index: idx, id: r?._id });
    }
  });

  return issues;
};

export const validateDishes = (dishes = [], restaurants = []) => {
  const issues = [];
  const ids = new Set();
  const slugs = new Set();
  const restaurantIds = new Set(restaurants.map((r) => r?._id).filter(Boolean));

  dishes.forEach((d, idx) => {
    REQUIRED_DISH_FIELDS.forEach((field) => {
      if (!d?.[field]) {
        issues.push({ kind: 'missing_field', field, index: idx, id: d?._id });
      }
    });
    if (d?._id) {
      if (ids.has(d._id)) {
        issues.push({ kind: 'duplicate_id', id: d._id, index: idx });
      } else {
        ids.add(d._id);
      }
    }
    if (d?.slug) {
      if (slugs.has(d.slug)) {
        issues.push({ kind: 'duplicate_slug', slug: d.slug, index: idx });
      } else {
        slugs.add(d.slug);
      }
    }
    const rid = d?.restaurantId || d?.restaurant?._id;
    if (!rid) {
      issues.push({ kind: 'missing_restaurantId', id: d?._id, index: idx });
    } else if (restaurantIds.size > 0 && !restaurantIds.has(rid)) {
      issues.push({ kind: 'orphan_restaurantId', id: d?._id, restaurantId: rid });
    }
    if (!isNonEmptyString(d?.image)) {
      issues.push({ kind: 'no_image', id: d?._id, index: idx });
    }
  });

  return issues;
};

export const validateTranslations = (locales = {}) => {
  const issues = [];
  const langs = Object.keys(locales);
  if (langs.length < 2) return issues;

  const flatten = (obj, prefix = '') => {
    const keys = [];
    for (const k of Object.keys(obj || {})) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
        keys.push(...flatten(obj[k], path));
      } else {
        keys.push(path);
      }
    }
    return keys;
  };

  const refLang = langs[0];
  const refKeys = new Set(flatten(locales[refLang]));

  for (const lang of langs.slice(1)) {
    const langKeys = new Set(flatten(locales[lang]));
    for (const key of refKeys) {
      if (!langKeys.has(key)) {
        issues.push({ kind: 'missing_translation', lang, key });
      }
    }
    for (const key of langKeys) {
      if (!refKeys.has(key)) {
        issues.push({ kind: 'extra_translation', lang, key });
      }
    }
  }

  return issues;
};

export const runDataHealthCheck = ({ restaurants = [], dishes = [], locales = {} } = {}) => {
  const report = {
    restaurants: validateRestaurants(restaurants),
    dishes: validateDishes(dishes, restaurants),
    translations: validateTranslations(locales),
    images: validateUniqueImages(restaurants, dishes),
  };

  if (isDev) {
    const total =
      report.restaurants.length +
      report.dishes.length +
      report.translations.length +
      (report.images.isHealthy ? 0 : 1);

    if (total === 0) {
      console.info('[dataHealthCheck] ✅ All data validations passed.');
    } else {
      console.groupCollapsed(`[dataHealthCheck] ⚠️ ${total} issue group(s) detected`);

      console.log('Restaurants:', report.restaurants);

      console.log('Dishes:', report.dishes);

      console.log('Translations:', report.translations);

      console.log('Images:', report.images);

      console.groupEnd();
    }
  }

  return report;
};

export default runDataHealthCheck;
