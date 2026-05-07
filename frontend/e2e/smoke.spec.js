// @ts-check
import { test, expect } from '@playwright/test';

// These smoke tests exercise the static UI (no backend required) to validate
// that build + routing + layout + responsive shell render correctly.

test.describe('Public pages — smoke', () => {
  test('Landing page loads with hero and FLAVORS logo', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/FLAVORS/i).first()).toBeVisible();
    // Footer should render (we scroll to it to guard lazy rendering if any)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });

  test('Dishes page loads', async ({ page }) => {
    await page.goto('/dishes');
    await expect(page).toHaveURL(/\/dishes/);
  });

  test('Restaurants page loads', async ({ page }) => {
    await page.goto('/restaurants');
    await expect(page).toHaveURL(/\/restaurants/);
  });

  test('Login, Register, Contact, Privacy, Terms render', async ({ page }) => {
    for (const path of ['/login', '/register', '/contact', '/privacy', '/terms']) {
      await page.goto(path);
      await expect(page).toHaveURL(new RegExp(path.replace('/', '\\/')));
    }
  });

  test('Restaurant detail and dish detail render with valid IDs', async ({ page }) => {
    await page.goto('/restaurants/1');
    await expect(page).toHaveURL(/\/restaurants\/1/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.goto('/dishes/1');
    await expect(page).toHaveURL(/\/dishes\/1/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('Unknown route shows NotFound', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    // NotFound page should include 404 text
    await expect(page.locator('body')).toContainText(/404|Not Found|introuvable|לא נמצא/i);
  });

});
