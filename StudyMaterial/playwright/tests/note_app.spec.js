const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page }) => { await page.goto('http://localhost:5173') })

  test('front page can be opened', async ({ page }) => {

    const locator = await page.getByText('Notes')
    console.log(locator)
    await expect(locator).toBeVisible()
    await expect(page.getByText('Pavol Polonec')).toBeVisible()
  })
  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click()
    await page.getByTestId('username').fill('mlukkai')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })
})