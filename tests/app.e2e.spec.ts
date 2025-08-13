import { test, expect } from '@playwright/test'

test('form renders expected field labels and buttons from default config', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Ensure page is ready
    await expect(page.getByRole('textbox')).toBeVisible()

    // Go to Result (either via Apply or tab click). Use Apply here.
    await page.getByRole('button', { name: 'Apply' }).click()

    // Field labels present
    for (const label of ['Username', 'Age', 'Biography', 'Subscribe', 'Birth Date', 'Gender']) {
        await expect(page.getByText(label).first()).toBeVisible()
    }

    // Buttons present
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible()
})

test('clicking Result tab without Apply renders default form', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Ensure page is ready
    await expect(page.getByRole('textbox')).toBeVisible()

    // Switch via Tabs instead of the Apply button
    await page.getByRole('link', { name: 'Result' }).click()

    // Expect default form heading
    await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible()
})

test('invalid JSON shows error panel and message after Apply', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Mess up the JSON
    const textarea = page.getByRole('textbox')
    await expect(textarea).toBeVisible()
    await textarea.click()
    await textarea.fill('{"title": "Broken"') // missing closing brace

    // Apply and expect error panel
    await page.getByRole('button', { name: 'Apply' }).click()

    await expect(page.getByText('Invalid configuration')).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('Invalid JSON configuration')).toBeVisible({ timeout: 15000 })
})

test('valid JSON with semantic errors shows detailed validation messages', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const badConfig = JSON.stringify(
        {
            title: 'Bad Config',
            fields: [
                { name: 'x', label: 'X', type: 'enum', options: [] }, // invalid: empty options
                { name: 'x', label: 'X again', type: 'string' }, // duplicate field name
            ],
            buttons: [
                { text: 'Go', variant: 'invalid' }, // invalid variant
            ],
        },
        null,
        2,
    )

    const textarea = page.getByRole('textbox')
    await expect(textarea).toBeVisible()
    await textarea.click()
    await textarea.fill(badConfig)
    await expect(textarea).toHaveValue(badConfig)

    // Navigate to Result via the Apply button to avoid pre-hydration anchor clicks
    await page.getByRole('button', { name: 'Apply' }).click()

    // Error panel header
    await expect(page.getByTestId('error-panel')).toBeVisible({ timeout: 15000 })

    // Specific semantic errors
    await expect(
        page.getByText('fields[0].options must be a non-empty array of strings for enum type'),
    ).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('duplicate field name: "x" appears 2 times')).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('buttons[0].variant is invalid: invalid')).toBeVisible({ timeout: 15000 })
})
