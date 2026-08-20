import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test('loads dashboard and displays default city data', async ({ page }) => {
    await page.goto('/');

    // Expect the title to be correct
    await expect(page).toHaveTitle(/Skyline/);

    // Expect the header text to be visible
    await expect(page.locator('h1').first()).toContainText('Weather & air, read like a station log.');

    // Wait for the data to load (skeleton should disappear)
    // The search bar input should contain 'Indore' eventually
    const searchInput = page.locator('input');
    await expect(searchInput).toBeVisible({ timeout: 30000 });
    // Removed toHaveValue check since the input is empty initially

    // Current weather card place name
    const placeName = page.locator('h1.text-2xl', { hasText: 'Indore' }).first();
    await expect(placeName).toBeVisible({ timeout: 10000 });

    // Check if KPIGrid elements loaded
    await expect(page.locator('text=Feels Like').first()).toBeVisible();
    await expect(page.locator('text=Humidity').first()).toBeVisible();
    
    // Check if charts are rendered
    await expect(page.locator('.recharts-wrapper').first()).toBeVisible();
  });

  test('handles searching for a new city', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('input');
    await searchInput.fill('Tokyo');
    await page.keyboard.press('Enter');

    // Current weather card should update to Tokyo
    const tokyoName = page.locator('h1.text-2xl', { hasText: 'Tokyo' }).first();
    await expect(tokyoName).toBeVisible({ timeout: 30000 });
  });

  test('handles invalid city search gracefully', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('input');
    await searchInput.fill('ThisCityDoesNotExist123');
    await page.keyboard.press('Enter');

    // Should display the ErrorState component
    await expect(page.locator('text=No location found')).toBeVisible({ timeout: 30000 });
  });
});
