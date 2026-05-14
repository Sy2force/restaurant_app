# Real Runtime Audit — Flavors of Israel

> Previous `CLOSING_REPORT.md` declared the project "Production Ready / Closed".
> A real manual runtime test showed the site is **slow** and **photos don't match**.
> This audit goes past the green-checkmark validators and looks at actual data + components.
> **Project status reverted to: Production Candidate (NOT closed yet).**

---

## 🔴 Real bugs found

### B1. Landing-page restaurants carousel is silently empty / broken

`src/data/mockLandingData.js` maps featured restaurants into:

```js
{
  id, name, image: restaurant.image, city, kosher, rating, cuisine
}
```

But `restaurants.data.js` uses `coverImage` / `imageUrl`, not `image`. `getCarouselItems()` then looks at `item.coverImage || item.imageUrl || item.image || item.logo` — all `undefined` after the map — so the carousel **silently drops every featured restaurant** when `featuredRestaurants` items are passed in. The landing carousel renders 0 cards or falls back to other items.

### B2. Same cover image on multiple restaurants (10 collisions)

| Image | Restaurants |
|---|---|
| `ocd` URL | OCD ↔ Ramat Gan Chic |
| `habasta` URL | HaBasta ↔ Decks Tiberias |
| `port_said` URL | Port Said ↔ Ashdod Marina |
| `abu_hassan` URL | Abu Hassan ↔ Beer Sheva Souk |
| `machneyuda` URL | Machneyuda ↔ Ranana Garden |
| `shila` URL | Shila ↔ Pago Pago |
| `taizu` URL | Taizu ↔ Petah Modern |
| `popina` URL | Popina ↔ Netanya View |
| `m25` URL | M25 ↔ Modi'in Family |
| `pastel` URL | Pastel ↔ Douzan |

This is the visible "wrong photo" bug: the same image is reused for two different restaurants.

### B3. Same image on unrelated dishes (5 collisions)

| Shared image | Dishes |
|---|---|
| 1 | `dish_003` Mushroom Hummus ↔ `dish_038` Matbucha |
| 2 | `dish_005` Tahini Sampler ↔ `dish_037` Labaneh |
| 3 | `dish_015` Tabouleh ↔ `dish_043` Grilled Vegetables ↔ `dish_057` Arabic Salad |
| 4 | `dish_031` Grilled Fish ↔ `dish_034` Chef Tasting Menu |
| 5 | `dish_035` Mediterranean Seafood ↔ `dish_048` Ceviche |

### B4. 15-second API timeout blocks public pages

`src/services/api.js` uses `timeout: 15000`. On Render free-tier cold start, the public Landing / Dishes / Restaurants pages wait **up to 15s** for `/api/restaurants` or `/api/dishes` to fail (the backend returns `[]` or never responds in time), then fall back to local mock. Users see a spinner for 15s before the first real frame.

### B5. Image registry has 24 dish and 26 restaurant URL-aliases pointing to the same picture

The registry mixes intentional aliases (`hummus` / `dish_hummus`) with accidental aliases between unrelated foods (`tabouleh, grilled_vegetables, arabic_salad`) and unrelated venues (`abu_hassan, beersheba_souk, restaurant_abu_hassan, chicken_skewer`). 35 image keys are never used by any real record.

### B6. Image elements lack `decoding="async"`

Cards already use `loading="lazy"` but never set `decoding="async"`, which keeps decoding on the main thread.

---

## 🟢 What is actually fine (already done before, verified again)

- Mock files are real wrappers over canonical data (`mockRestaurants` / `mockDishes` / `featuredDishes` / `mockLandingData.featuredRestaurants` are derived, not duplicated).
- `restaurants.data.js` and `dishes.data.js` are the only sources.
- `dish.restaurant` snapshot now matches its parent (validator: 0 errors).
- `RestaurantDetail.jsx` correctly filters dishes via `getDishesByRestaurantId(id)`.
- Routes are lazy-loaded with `Suspense`.
- `getSafeImage` + `imageOnError` are wired into the cards.
- Backend handles Google Places 403 without crashing.

---

## ✅ Fixes applied in this commit cycle

See `REAL_FIX_REPORT.md` for the exact code changes.
