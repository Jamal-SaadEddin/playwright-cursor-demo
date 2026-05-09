import { test, expect } from '@playwright/test';

// spec: tests/automation-practice-form.plan.md
// seed: tests/seed.spec.ts

test.describe('Student Registration Form (DemoQA)', () => {
  test('Happy path – submit with all required and optional fields valid', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');

    // 1. Enter valid First Name and Last Name (e.g. alphanumeric, reasonable length).
    await page.getByRole('textbox', { name: 'First Name' }).fill('Jane');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');

    // 2. Enter a valid email (format user@domain.tld).
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('jane.doe@example.com');

    // 3. Select one Gender option (Male, Female, or Other).
    await page.getByRole('radio', { name: 'Female', exact: true }).click();

    // 4. Enter a valid 10-digit mobile number (digits only, per label).
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('9876543210');

    // 5. Set Date of Birth using the date control to a valid past date.
    await page.locator('#dateOfBirthInput').click();
    await page.getByRole('gridcell', { name: /May 15th/ }).click();

    // 6. In Subjects, type a partial subject name and select a suggested option (e.g. from provided list).
    await page.locator('#subjectsInput').click();
    await page.locator('#subjectsInput').pressSequentially('Computer Science');
    await page.getByRole('option', { name: 'Computer Science' }).click();

    // 7. Select one or more Hobbies checkboxes.
    await page.getByRole('checkbox', { name: 'Music' }).click();

    // 8. Optionally choose a small image file via Picture → Choose File (skipped — optional per plan).

    // 9. Enter text in Current Address.
    await page.getByRole('textbox', { name: 'Current Address' }).fill('123 Main Street, Springfield');

    // 10. Open State, select a state; then open City and select a city for that state.
    await page.locator('#state').click();
    await page.getByRole('option', { name: 'NCR', exact: true }).click();
    await page.locator('#city').click();
    await page.getByRole('option', { name: 'Delhi', exact: true }).click();

    // 11. Click Submit.
    await page.getByRole('button', { name: 'Submit' }).click();

    // 11–12. Confirmation modal lists submitted values; close when present.
    const thanksModal = page.getByRole('dialog', { name: 'Thanks for submitting the form' });
    await expect(thanksModal).toBeVisible();

    // Assert every value we entered is shown in the thanks modal (Picture was skipped).
    await expect(thanksModal).toContainText('Jane');
    await expect(thanksModal).toContainText('Doe');
    await expect(thanksModal).toContainText('jane.doe@example.com');
    await expect(thanksModal).toContainText('Female');
    await expect(thanksModal).toContainText('9876543210');
    await expect(thanksModal).toContainText('Computer Science');
    await expect(thanksModal).toContainText('Music');
    await expect(thanksModal).toContainText('123 Main Street, Springfield');
    await expect(thanksModal).toContainText('NCR');
    await expect(thanksModal).toContainText('Delhi');
    // DemoQA renders DOB like "15 May,2026" in the results table.
    await expect(thanksModal).toContainText('15 May,2026');

    // 12. Close the modal (DemoQA uses Bootstrap; Escape dismisses reliably in automation).
    await page.keyboard.press('Escape');
    await expect(thanksModal).toBeHidden();
  });
});
