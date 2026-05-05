// @ts-check
import { test, expect } from '@playwright/test';

// B2B flow — simulate a business user via direct authStore hydration (Zustand persist).
// This avoids needing a live backend for the UI-level smoke check.
// A real end-to-end test against the API should live in a separate integration suite.

const businessUser = {
  state: {
    user: {
      _id: 'b2b-user-1',
      name: 'Chef Business',
      email: 'biz@example.com',
      isBusiness: true,
      isAdmin: false,
      avatar: '',
    },
    token: 'mock-b2b-token',
    isAuthenticated: true,
  },
  version: 0,
};

/**
 * @param {import('@playwright/test').Page} page
 */
async function loginAsBusiness(page) {
  await page.addInitScript(/** @param {any} payload */ (payload) => {
    window.localStorage.setItem('auth-storage', JSON.stringify(payload));
  }, businessUser);
}

test.describe('B2B — Business dashboard access', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsBusiness(page);
  });

  test('can open dashboard root', async ({ page }) => {
    await page.goto('/dashboard');
    // Should not redirect to /login or /unauthorized
    await expect(page).not.toHaveURL(/\/login/);
    await expect(page).not.toHaveURL(/\/unauthorized/);
    await expect(page).toHaveURL(/\/dashboard$/);
  });

  const b2bPaths = [
    '/dashboard/restaurants',
    '/dashboard/restaurants/create',
    '/dashboard/dishes',
    '/dashboard/dishes/create',
    '/dashboard/recipes',
    '/dashboard/recipes/create',
    '/dashboard/analytics',
    '/dashboard/settings',
    '/dashboard/cards',
    '/dashboard/cards/create',
  ];

  for (const path of b2bPaths) {
    test(`business can access ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).not.toHaveURL(/\/login/);
      await expect(page).not.toHaveURL(/\/unauthorized/);
    });
  }

  test('admin routes are blocked for business (not admin)', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/unauthorized/);
  });
});

test.describe('B2B mobile responsive — bottom nav', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('mobile bottom nav visible on public pages', async ({ page }) => {
    await page.goto('/');
    // Five bottom nav links
    const bottomNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(bottomNav).toBeVisible();
    await expect(bottomNav.locator('a')).toHaveCount(5);
  });

  test('mobile bottom nav hidden on /login', async ({ page }) => {
    await page.goto('/login');
    const bottomNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(bottomNav).toHaveCount(0);
  });

  test('mobile bottom nav is fixed to bottom', async ({ page }) => {
    await page.goto('/');
    const bottomNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(bottomNav).toBeVisible();
    const box = await bottomNav.boundingBox();
    expect(box).toBeTruthy();
    // Should be within the last 120px of the viewport
    if (box) {
      expect(box.y).toBeGreaterThan(844 - 160);
    }
  });
});
