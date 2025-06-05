const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3000/api/testing/reset')
    await request.post('http://localhost:3000/api/users', {
      data: {
        name: 'Tester Testerowski',
        username: 'tester',
        password: 'owski'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('tester')
      await page.getByTestId('password').fill('owski')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('blogs')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('wrong')
      await page.getByTestId('password').fill('info')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

})