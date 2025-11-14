import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import { expect } from 'vitest'

test('submitting blog triggers event handler from props', async () => {
  const testTitle = 'title'
  const testAuthor = 'author'
  const testUrl = 'url'

  const returnToParent = (author, title, url) => {
    expect(title).toEqual(testTitle)
    expect(author).toEqual(testAuthor)
    expect(url).toEqual(testUrl)
  }

  render(<NewBlogForm returnToParent={returnToParent}/>)
  const button = screen.getByTestId('button-submit')
  expect(button).toBeDefined()
  const user = userEvent.setup()
  const titleInput = screen.getByTestId('input-title')
  const authorInput = screen.getByTestId('input-author')
  const urlInput = screen.getByTestId('input-url')
  expect(titleInput).toBeDefined()
  expect(authorInput).toBeDefined()
  expect(urlInput).toBeDefined()
  await user.type(titleInput, testTitle)
  await user.type(authorInput, testAuthor)
  await user.type(urlInput, testUrl)
  await user.click(button)
  // await user.click(button)
  // const likeButton = screen.getByTestId('button-like')
  // expect(likeButton).toBeDefined()




  // // const likeBlog = vi.fn()
  // const likeBlog = vi.fn()
  // likeButton.onclick = () => likeBlog()
  // console.log(likeButton)
  // await user.click(likeButton)
  // await user.click(likeButton)
  // // await user.click(likeButton)
  // expect(likeBlog.mock.calls).toHaveLength(2)
})