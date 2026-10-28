import {test,expect} from '@playwright/test';
test('search filters products by name', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.product-card');
  await expect(cards.first()).toBeVisible();

  await page.getByPlaceholder('Search luxury items...').fill('zzzzzzzzz');

  await expect(cards).toHaveCount(0);
});