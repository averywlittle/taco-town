import { TACO_TOWN_API } from '@/utils/constants';
import { test, expect, Page } from '@playwright/test';

const getMenuItems = async (page: Page) => {
  await page.route(`${TACO_TOWN_API}/menu`, async (route) => {
    const json = [
      {
        id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        name: 'Veggie Taco',
        category: 'Tacos',
        price: 1.0,
        discount_percent: 20.0,
        discount_threshold: 5,
      },
      {
        id: '1f939cac-391f-438a-aeb5-b47299e625da',
        name: 'Beef Taco',
        category: 'Tacos',
        price: 1.0,
        discount_percent: 20.0,
        discount_threshold: 5,
      },
      {
        id: 'a0183eeb-be8f-40d9-a195-8ac6daae4927',
        name: 'Chicken Taco',
        category: 'Tacos',
        price: 1.0,
        discount_percent: 20.0,
        discount_threshold: 5,
      },
      {
        id: 'c503c2d4-2b59-4f30-97df-4cbeb5cbd063',
        name: 'Pork Taco',
        category: 'Tacos',
        price: 1.0,
        discount_percent: 20.0,
        discount_threshold: 5,
      },
      {
        id: 'd67a4bf1-2a01-4251-83fc-484a9117708b',
        name: 'Coke',
        category: 'Drinks',
        price: 1.5,
      },
      {
        id: '32471098-903f-4ebc-bfff-2b5f404c91e4',
        name: 'Is Pepsi OK?',
        category: 'Drinks',
        price: 1.5,
      },
    ];
    await route.fulfill({ json });
  });
};

const submitOrder = async (page: Page) => {
  await page.route(`${TACO_TOWN_API}/order`, async (route) => {
    const json = {
      orderStatus: 'Prepping your order',
      orderReadyTime: '2020-06-18T22:00:00+00:00',
    };
    await route.fulfill({ json });
  });
};

test.describe('taco town', () => {
  test('can add and remove from cart', async ({ page }) => {
    await getMenuItems(page);
    await page.goto('http://localhost:3000');

    await expect(page.locator('id=menu-item-name').first()).toContainText('Veggie Taco');

    await page.locator('id=add-menu-btn').first().click();
    await page.locator('id=add-menu-btn').first().click();
    await page.locator('id=remove-menu-btn').first().click();

    await expect(page.locator('id=menu-item-quantity').first()).toContainText('x1');
  });

  test('can checkout and submit order', async ({ page }) => {
    await getMenuItems(page);
    await submitOrder(page);
    await page.goto('http://localhost:3000');

    await page.locator('id=add-menu-btn').first().click();
    await page.locator('id=add-menu-btn').first().click();

    await page.locator('id=add-menu-btn').nth(2).click();
    await page.locator('id=add-menu-btn').nth(2).click();

    await page.locator('id=view-order').click();
    await expect(page.locator('id=cart-total')).toContainText('$4');
    await page.locator('id=cart-checkout').click();

    await page.waitForURL('http://localhost:3000/checkout');

    await page.locator('id=checkout-name').fill('Test');
    await page.locator('id=checkout-submit').click();

    await expect(page.locator('id=order-success').first()).toContainText(
      'Your order was submitted successfully!',
    );
  });
});
