import {test,expect} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('user can log in with valid credentials and redirected to home', async ({ page }) => { 
    await page.goto('/login');

    await page.getByPlaceholder('Enter your email').fill(process.env.E2E_EMAIL);
    await page.getByPlaceholder('Enter your password').fill(process.env.E2E_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Logout', { exact: true })).toBeVisible();
})