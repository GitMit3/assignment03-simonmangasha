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

//BACKEND


test.describe('Backend tests', () => {
  test('Test case 01 - Logga in API', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/login', {
      data: {
        "username": process.env.TEST_USERNAME,
        "password": process.env.TEST_PASSWORD
      }
    });
    expect(response.ok()).toBeTruthy();
  });

  test('Test case 02 - Skapa ny kund API', async ({ request }) => {
    const loginResponse = await request.post('http://localhost:3000/api/login', {
      data: {
        "username": process.env.TEST_USERNAME,
        "password": process.env.TEST_PASSWORD
      }
    });
  
    const { token } = await loginResponse.json();
  
    
    const payload = {
      name: 'Gunnar Gren', 
      email: 'gunnar.gren@example.com', 
    };
  
    const response = await request.post('http://localhost:3000/api/client/new', {
      headers: {
        'Content-Type': 'application/json',
        'X-user-auth': JSON.stringify({ username: 'tester01', token }),
      },
      data: JSON.stringify(payload), 
    });
  
    
    expect(response.ok()).toBeTruthy();
    const client = await response.json();
    expect(client.name).toBe(payload.name);
    expect(client.email).toBe(payload.email);
  });
})