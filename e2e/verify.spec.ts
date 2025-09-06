import { test, expect } from '@playwright/test';

test('Lending dashboard loads correctly after login', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:5173/login');

  // Fill in the login form
  await page.getByPlaceholder('name@example.com').fill('test@example.com');
  await page.getByPlaceholder('********').fill('password');

  // Click the sign-in button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for the check-in page to load after login
  const checkInHeading = page.locator('h1', { hasText: 'Check-In' });
  await expect(checkInHeading).toBeVisible({ timeout: 15000 });

  // Now, navigate to the lending dashboard
  await page.goto('http://localhost:5173/app/lending');

  // Wait for the dashboard heading to be visible
  const dashboardHeading = page.locator('h1', { hasText: 'Dashboard' });
  await expect(dashboardHeading).toBeVisible({ timeout: 10000 });

  // Take a screenshot
  await page.screenshot({ path: 'lending-dashboard.png' });
});
