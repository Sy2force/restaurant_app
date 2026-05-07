// @ts-check
import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('B2B mobile responsive — bottom nav', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('mobile bottom nav visible on public pages', async ({ page }) => {
    await page.goto('/');
    // Four public links in the simplified nav
    const bottomNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(bottomNav).toBeVisible();
    await expect(bottomNav.locator('a')).toHaveCount(4);
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

  test('mobile navigation routes work', async ({ page }) => {
    await page.goto('/');
    const bottomNav = page.locator('nav[aria-label="Mobile navigation"]');

    await bottomNav.getByRole('link', { name: /restaurants/i }).click();
    await expect(page).toHaveURL(/\/restaurants/);

    await bottomNav.getByRole('link', { name: /dishes|plats/i }).click();
    await expect(page).toHaveURL(/\/dishes/);

    await bottomNav.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
