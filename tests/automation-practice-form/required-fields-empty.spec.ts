import { test, expect } from '@playwright/test';

// spec: tests/automation-practice-form.plan.md
// seed: tests/seed.spec.ts

test.describe('Student Registration Form (DemoQA)', () => {
  test('Required fields – empty submit', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');

    // 1. Ensure all inputs are empty/default; do not select gender; clear mobile and names if pre-filled.
    await page.getByRole('textbox', { name: 'First Name' }).clear();
    await page.getByRole('textbox', { name: 'Last Name' }).clear();
    await page.getByRole('textbox', { name: 'name@example.com' }).clear();
    await page.getByRole('textbox', { name: 'Mobile Number' }).clear();

    // 2. Click Submit.
    await page.getByRole('button', { name: 'Submit' }).click();

    // Submission blocked by HTML5 validation — no success modal.
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
