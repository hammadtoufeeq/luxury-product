import {test, expect} from '@playwright/test';

test('login page loads and shows the form', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByPlaceholder('Enter your email')).toBeVisible();
  await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
})