const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Note app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3000/api/testing/reset')
    await request.post('http://localhost:3000/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {

    const locator = await page.getByText('Notes')
    console.log(locator)
    await expect(locator).toBeVisible()
    await expect(page.getByText('Pavol Polonec')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByTestId('new-note').fill('a note created by playwright')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('a note created by playwright added')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId('new-note').fill('another note by playwright')
        await page.getByRole('button', { name: 'Submit' }).click()
        await expect(page.getByText('another note by playwright added')).toBeVisible()
      })
      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })
  })
})