import { test, expect } from '@playwright/test';

// spec: tests/automation-practice-form.plan.md
// seed: tests/seed.spec.ts

test.describe('Student Registration Form (DemoQA)', () => {
  test('Verify default layout and accessibility of all form sections', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');

    // 1. Open the Automation Practice Form page.
    await expect(page.getByRole('heading', { level: 1, name: 'Practice Form' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Student Registration Form' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'name@example.com' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Mobile Number' })).toBeVisible();
    await expect(page.getByText('Date of Birth')).toBeVisible();
    await expect(page.getByText('Subjects')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Sports' })).toBeVisible();
    await expect(page.getByText('Picture')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Current Address' })).toBeVisible();
    await expect(page.getByText('State and City')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

    // 2. Tab through interactive controls from top to bottom.
    await page.getByRole('textbox', { name: 'First Name' }).focus();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeFocused();
  });
});
