/**
 * Centralised image registry for restaurants, dishes and fallbacks.
 * Single source of truth: avoids duplicates and hard-coded URLs scattered.
 */

// Curated, distinct Unsplash photos. Each URL appears at most ONCE here.
export const RESTAURANT_IMAGES = {
  restaurant_mizlala: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2940',
  restaurant_machneyuda: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940',
  restaurant_eucalyptus: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=2940',
  restaurant_herbert_samuel:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940',
  restaurant_darya: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940',
  restaurant_1868: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874',
  restaurant_dr_shakshuka:
    'https://images.unsplash.com/photo-1538334421852-687c439c92f4?q=80&w=2940',
  restaurant_sabich_frishman:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2942',
  restaurant_abu_hassan: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2940',
  restaurant_hakosem: 'https://images.unsplash.com/photo-1590593162201-f67611a18b87?q=80&w=2787',
  restaurant_miznon: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2832',
  restaurant_ocd: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2940',
  restaurant_claro: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874',
  restaurant_mashya: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874',
  restaurant_port_said: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2940',
  restaurant_mona: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2940',
  restaurant_azura: 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?q=80&w=2940',
  restaurant_taizu: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940',
  restaurant_uri_buri: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2940',
};

export const DISH_IMAGES = {
  dish_shakshuka: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=2874',
  dish_sabich: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2940',
  dish_hummus: 'https://images.unsplash.com/photo-1630151317382-042c10b42c8d?q=80&w=2806',
  dish_falafel: 'https://images.unsplash.com/photo-1593252719532-347b6c86f1a6?q=80&w=2787',
  dish_eggplant_carpaccio:
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2940',
  dish_sea_bass: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=2940',
  dish_lamb_kebab: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2940',
  dish_jachnun: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940',
  dish_malabi: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2940',
  dish_knafeh: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2940',
  dish_baba_ganoush: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?q=80&w=2940',
  dish_tabouleh: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2940',
  dish_burekas: 'https://images.unsplash.com/photo-1620057654554-0c7eb2c4e6b8?q=80&w=2940',
  dish_chicken_skewer: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2940',
  dish_tartare: 'https://images.unsplash.com/photo-1548943487-a2e4e43b485c?q=80&w=2940',
  dish_foie_gras: 'https://images.unsplash.com/photo-1627662236879-c29019672689?q=80&w=2874',
};

export const FALLBACK_IMAGES = {
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940',
  dish: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940',
  user: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=2940',
  cover: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940',
};

/**
 * Returns a safe image URL. Never returns undefined/null.
 * - Accepts URL strings or registry keys (e.g. "dish_hummus").
 * - Falls back to FALLBACK_IMAGES[type] when invalid/empty.
 */
export const getSafeImage = (image, type = 'restaurant') => {
  const fallback = FALLBACK_IMAGES[type] || FALLBACK_IMAGES.restaurant;

  if (!image || typeof image !== 'string') return fallback;

  // Registry key
  if (RESTAURANT_IMAGES[image]) return RESTAURANT_IMAGES[image];
  if (DISH_IMAGES[image]) return DISH_IMAGES[image];

  // Already a URL
  if (
    image.startsWith('http://') ||
    image.startsWith('https://') ||
    image.startsWith('data:') ||
    image.startsWith('/')
  ) {
    return image;
  }

  return fallback;
};

/**
 * Build an onError handler for <img> elements that swaps to fallback.
 * Usage: <img src={getSafeImage(...)} onError={imageOnError('dish')} />
 */
export const imageOnError =
  (type = 'restaurant') =>
  (event) => {
    const target = event?.currentTarget;
    if (!target) return;
    const fallback = FALLBACK_IMAGES[type] || FALLBACK_IMAGES.restaurant;
    if (target.src !== fallback) {
      target.src = fallback;
    }
  };

/**
 * Detect duplicate / missing images across collections.
 * Returns a structured report (no throw). Used by dataHealthCheck.
 */
export const validateUniqueImages = (restaurants = [], dishes = []) => {
  const seenRestaurantImages = new Map();
  const duplicateRestaurantImages = [];
  const restaurantsWithoutImage = [];

  restaurants.forEach((r) => {
    const img = r?.coverImage || r?.imageUrl || r?.logo;
    if (!img) {
      restaurantsWithoutImage.push(r?._id || r?.slug || r?.name || 'unknown');
      return;
    }
    if (seenRestaurantImages.has(img)) {
      duplicateRestaurantImages.push({
        image: img,
        ids: [seenRestaurantImages.get(img), r?._id || r?.name],
      });
    } else {
      seenRestaurantImages.set(img, r?._id || r?.name);
    }
  });

  const seenDishImages = new Map();
  const duplicateDishImages = [];
  const dishesWithoutImage = [];

  dishes.forEach((d) => {
    const img = d?.image;
    if (!img) {
      dishesWithoutImage.push(d?._id || d?.slug || d?.name || 'unknown');
      return;
    }
    if (seenDishImages.has(img)) {
      duplicateDishImages.push({
        image: img,
        ids: [seenDishImages.get(img), d?._id || d?.name],
      });
    } else {
      seenDishImages.set(img, d?._id || d?.name);
    }
  });

  return {
    restaurantsWithoutImage,
    duplicateRestaurantImages,
    dishesWithoutImage,
    duplicateDishImages,
    isHealthy:
      restaurantsWithoutImage.length === 0 &&
      duplicateRestaurantImages.length === 0 &&
      dishesWithoutImage.length === 0 &&
      duplicateDishImages.length === 0,
  };
};

/**
 * Build a list of carousel items with strict guards:
 * - drops items without image
 * - drops items without title
 * - dedupes by id then by image
 * - limits to maxItems
 */
export const getCarouselItems = (items = [], options = {}) => {
  const { maxItems = 12, type = 'restaurant', titleField = 'name' } = options;
  if (!Array.isArray(items)) return [];

  const seenIds = new Set();
  const seenImages = new Set();
  const result = [];

  for (const item of items) {
    if (!item) continue;
    const id = item._id || item.id || item.slug;
    if (!id || seenIds.has(id)) continue;

    const rawImage = item.coverImage || item.imageUrl || item.image || item.logo || null;
    const image = getSafeImage(rawImage, type);

    // Skip items where the image is the global fallback AND no original was present
    if (!rawImage) continue;
    if (seenImages.has(image)) continue;

    const title =
      typeof item[titleField] === 'string'
        ? item[titleField]
        : item[titleField]?.fr || item[titleField]?.en || null;
    if (!title) continue;

    seenIds.add(id);
    seenImages.add(image);
    result.push({ ...item, _safeImage: image });

    if (result.length >= maxItems) break;
  }

  return result;
};
