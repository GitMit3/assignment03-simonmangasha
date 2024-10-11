import { test, expect } from '@playwright/test';

test.describe('Front-end tests', () => {
  test('Test case 01 - Logga in', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });

test('Test case 02 - Skapa ny kund', async ({ page }) => {
  
    await page.goto('http://localhost:3000');

    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();


    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await page.locator('#app > div > div > div:nth-child(2) > a').click();

    await page.locator('#app > div > h2 > a').click();

    await page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]').fill('GunnarGren'); 
    await page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=email]').fill('GunnarGren@gmail.com'); 
    await page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=text]').fill('0700000000'); 

    await page.locator('a.btn.blue').click();

  
    await expect(page.locator('h3:has-text("GunnarGren")')).toBeVisible();
  });
})