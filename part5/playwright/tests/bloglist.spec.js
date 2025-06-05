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
    await request.post('http://localhost:3000/api/users', {
      data: {
        name: 'Tester Testerowski',
        username: 'owski',
        password: 'tester'
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
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('tester')
      await page.getByTestId('password').fill('owski')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()
      await page.getByTestId('input-title').fill('testing blog')
      await page.getByTestId('input-author').fill('tester')
      await page.getByTestId('input-url').fill('tester.eu')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('testing blog tester')).toBeVisible()
    })
    describe('User can', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'New blog' }).click()
        await page.getByTestId('input-title').fill('testing blog')
        await page.getByTestId('input-author').fill('tester')
        await page.getByTestId('input-url').fill('tester.eu')
        await page.getByRole('button', { name: 'Submit' }).click()
        await expect(page.getByText('testing blog tester')).toBeVisible()
      })
      test('like blog', async ({ page }) => {
        await page.getByRole('button', { name: 'Show' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('blog tester by testing blog was liked')).toBeVisible()
      })
      test('delete blog', async ({ page }) => {
        await page.getByRole('button', { name: 'Show' }).click()
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'Delete' }).click()
        await expect(page.getByText('blog tester by testing blog was deleted')).toBeVisible()
      })
      describe('not', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'Logout' }).click()
          await page.getByTestId('username').fill('owski')
          await page.getByTestId('password').fill('tester')
          await page.getByRole('button', { name: 'Submit' }).click()
          await expect(page.getByText('blogs')).toBeVisible()
        })
        test('delete blog of other user', async ({ page }) => {
          await page.getByRole('button', { name: 'Show' }).click()
          page.on('dialog', dialog => dialog.accept());
          await expect(page.getByRole('button', { name: 'Like' })).toBeVisible()
          await expect(page.getByRole('button', { name: 'Delete' })).toBeHidden()
        })
      })
    })

  })
  describe('Blogs are ordered correctly', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('tester')
      await page.getByTestId('password').fill('owski')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('blogs')).toBeVisible()

      await page.getByRole('button', { name: 'New blog' }).click()
      await page.getByTestId('input-title').fill('Blog1')
      await page.getByTestId('input-author').fill('tester')
      await page.getByTestId('input-url').fill('tester.eu')
      await page.getByRole('button', { name: 'Submit' }).click()
      await page.getByRole('button', { name: 'Show' }).click()
      await page.getByRole('button', { name: 'Like' }).click()

      await page.getByTestId('input-title').fill('Blog2')
      await page.getByTestId('input-author').fill('tester')
      await page.getByTestId('input-url').fill('tester.eu')
      await page.getByRole('button', { name: 'Submit' }).click()
      await page.getByRole('button', { name: 'Show' }).last().click()
      await page.getByRole('button', { name: 'Like' }).last().click()
      await page.getByRole('button', { name: 'Like' }).last().click()
      await page.getByRole('button', { name: 'Like' }).last().click()
      
    })
    test('likes', async ({ page }) => {
      const divs = await page.getByTestId('hidden').all()
      console.log(divs)
      await expect(page.getByTestId('hidden').first()).toContainText('Blog2')
    })
  })



})