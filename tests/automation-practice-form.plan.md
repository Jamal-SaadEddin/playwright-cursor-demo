# Automation Practice Form – Test Plan

## Application Overview

Test plan for the DemoQA **Student Registration Form** at https://demoqa.com/automation-practice-form. The page provides text inputs (name, email, mobile, address), radio buttons (gender), a date-of-birth control, a subjects typeahead, hobby checkboxes, optional picture upload, cascading State/City selects, and Submit. Assumption for every scenario: fresh page load with no prior form data (or cleared storage) unless noted.

## Test Scenarios

### 1. Student Registration Form (DemoQA)

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify default layout and accessibility of all form sections

**File:** `tests/automation-practice-form/layout-and-labels.spec.ts`

**Steps:**
  1. Open the Automation Practice Form page.
    - expect: Page title/heading includes Practice Form or Student Registration Form.
    - expect: First Name, Last Name, Email, Gender, Mobile, Date of Birth, Subjects, Hobbies, Picture, Current Address, State and City, and Submit are visible.
  2. Tab through interactive controls from top to bottom.
    - expect: Focus order follows visual order logically.
    - expect: Each field exposes an accessible name matching its visible label or placeholder.

#### 1.2. Happy path – submit with all required and optional fields valid

**File:** `tests/automation-practice-form/happy-path-full-form.spec.ts`

**Steps:**
  1. Enter valid First Name and Last Name (e.g. alphanumeric, reasonable length).
    - expect: Values appear in the respective fields.
  2. Enter a valid email (format user@domain.tld).
    - expect: Email field accepts the value with no client error.
  3. Select one Gender option (Male, Female, or Other).
    - expect: Exactly one radio is selected.
  4. Enter a valid 10-digit mobile number (digits only, per label).
    - expect: Mobile field shows 10 digits; no validation error before submit.
  5. Set Date of Birth using the date control to a valid past date.
    - expect: Displayed date updates to the chosen value.
  6. In Subjects, type a partial subject name and select a suggested option (e.g. from provided list).
    - expect: Selected subject appears as a tag/chip in the field.
  7. Select one or more Hobbies checkboxes.
    - expect: Each chosen hobby is checked.
  8. Optionally choose a small image file via Picture → Choose File.
    - expect: File name or upload state reflects the chosen file (if UI shows it).
  9. Enter text in Current Address.
    - expect: Multiline text is accepted.
  10. Open State, select a state; then open City and select a city for that state.
    - expect: City list matches selected state; both values are set.
  11. Click Submit.
    - expect: A confirmation modal (or summary) appears listing submitted values matching inputs.
    - expect: No unexpected full-page error.
  12. Close the modal if a close control exists.
    - expect: Modal dismisses and user returns to form or idle state.

#### 1.3. Happy path – minimum required fields only (no optional picture/hobbies/subjects if allowed)

**File:** `tests/automation-practice-form/happy-path-minimal.spec.ts`

**Steps:**
  1. Fill only fields that are enforced as required by the browser or product (typically name, gender, mobile, DOB; confirm against live validation).
    - expect: No HTML5 or inline validation errors while filling.
  2. Leave optional fields empty (Picture, some Hobbies, Subjects, Address, State/City if not required—verify against actual required attributes).
    - expect: Form still allows focus and Submit if product allows.
  3. Click Submit.
    - expect: Success modal appears when requirements are met; otherwise document which optional fields are actually required.

#### 1.4. Required fields – empty submit

**File:** `tests/automation-practice-form/required-fields-empty.spec.ts`

**Steps:**
  1. Ensure all inputs are empty/default; do not select gender; clear mobile and names if pre-filled.
    - expect: Form is in a blank or default state.
  2. Click Submit.
    - expect: Submission is blocked OR validation messages appear for missing required fields (HTML5 bubble, red border, or inline text).
    - expect: No success modal with complete registration.

#### 1.5. Email – invalid formats and boundary

**File:** `tests/automation-practice-form/email-validation.spec.ts`

**Steps:**
  1. Fill required non-email fields validly; enter email without @ (e.g. notanemail).
    - expect: On submit or blur, validation indicates invalid email format.
  2. Try email missing domain (user@).
    - expect: Validation fails or field is marked invalid.
  3. Enter a syntactically valid long email within typical limits.
    - expect: Accepted if within max length constraints.

#### 1.6. Mobile – length, non-numeric, and boundary

**File:** `tests/automation-practice-form/mobile-validation.spec.ts`

**Steps:**
  1. Enter fewer than 10 digits with other fields valid; submit.
    - expect: Validation prevents success or shows error for mobile.
  2. Enter more than 10 digits or letters mixed with digits.
    - expect: Input is restricted, sanitized, or rejected on submit per product rules.
  3. Enter exactly 10 numeric digits.
    - expect: Field accepts input; combined with other required data, submit can succeed.

#### 1.7. Gender – selection rules

**File:** `tests/automation-practice-form/gender-radio.spec.ts`

**Steps:**
  1. Without selecting gender, attempt submit with other required fields filled.
    - expect: Submit blocked or gender marked required.
  2. Select Male, then Female.
    - expect: Only one radio remains selected (mutually exclusive).

#### 1.8. Date of Birth – picker and invalid combinations

**File:** `tests/automation-practice-form/date-of-birth.spec.ts`

**Steps:**
  1. Open the date picker and select different year/month/day.
    - expect: Calendar navigates; selected date displays in the textbox.
  2. If applicable, attempt future date or edge date per product rules.
    - expect: Either allowed with warning, blocked, or accepted—record actual behavior.

#### 1.9. Subjects – typeahead, add, remove

**File:** `tests/automation-practice-form/subjects-combobox.spec.ts`

**Steps:**
  1. Focus Subjects combobox; type partial string with no match.
    - expect: No chip added; optional empty or no-results state.
  2. Type valid prefix and pick from dropdown (e.g. Computer Science, English).
    - expect: Subject appears as selected tag; can add multiple subjects if supported.
  3. If UI supports removal, remove one subject tag.
    - expect: That subject no longer appears in the value.

#### 1.10. Hobbies – multiple selection

**File:** `tests/automation-practice-form/hobbies-checkboxes.spec.ts`

**Steps:**
  1. Toggle Sports on and off.
    - expect: Checkbox state follows clicks.
  2. Select all three hobbies.
    - expect: All three are checked simultaneously.
  3. Submit with valid required data and multiple hobbies.
    - expect: Success summary reflects selected hobbies.

#### 1.11. Picture – file upload optional and constraints

**File:** `tests/automation-practice-form/picture-upload.spec.ts`

**Steps:**
  1. Click Choose File and select a small valid image (e.g. PNG/JPG).
    - expect: File is associated with input; submit succeeds with other valid data.
  2. If testable, attempt non-image or oversize file per environment policy.
    - expect: Upload rejected, error shown, or ignored—document actual behavior.

#### 1.12. State and City – dependency and clearing

**File:** `tests/automation-practice-form/state-city-cascade.spec.ts`

**Steps:**
  1. Open City before choosing State (if enabled).
    - expect: City is disabled, empty, or prompts to select state first.
  2. Select a State; verify City options populate.
    - expect: City dropdown lists cities for that state only.
  3. Change State after selecting City.
    - expect: City resets or updates to match new state; stale city not submitted.

#### 1.13. Current Address – length and special characters

**File:** `tests/automation-practice-form/address-textarea.spec.ts`

**Steps:**
  1. Paste a long multiline address.
    - expect: Text is accepted or truncated per max length—document behavior.
  2. Enter address with special characters (apostrophe, comma, hyphen).
    - expect: Characters display correctly; submit succeeds if field optional or valid.

#### 1.14. Submit control – double submit and keyboard

**File:** `tests/automation-practice-form/submit-behavior.spec.ts`

**Steps:**
  1. Complete form validly; activate Submit via mouse.
    - expect: Single success flow; no duplicate modals from one deliberate submit.
  2. Where applicable, submit using Enter from a focused field.
    - expect: Behavior matches product (submit or move focus)—no accidental data loss.

#### 1.15. Navigation – header logo and sidebar

**File:** `tests/automation-practice-form/navigation-chrome.spec.ts`

**Steps:**
  1. Click site logo or home link in header.
    - expect: Navigates to DemoQA home or expected URL without losing unsaved work unexpectedly (note if new page).
  2. Expand/collapse Forms menu; click Practice Form while on page.
    - expect: Menu works; page reloads or stays stable as expected.
