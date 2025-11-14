import React, { useRef, useState } from 'react'
import Togglable from './Togglable'

const NewBlogForm = ({ returnToParent }) => {

  const handleChange = (e, field) => {
    const val = e.target.value
    switch (field) {
      case 'title':
        setTitle(val)
        break
      case 'author':
        setAuthor(val)
        break
      case 'url':
        setUrl(val)
        break
    }
  }
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const newBlogFormRef = useRef()

  const formSubmit = () => {
    returnToParent(author, title, url)
    newBlogFormRef.current.toggleVisibility()
    setAuthor('')
    setTitle('')
    setUrl('')
  }


  return (
    <Togglable buttonLabel='New blog' ref={newBlogFormRef}>
      <h2>new blog</h2>
      <label>
        title: <input value={title} onChange={e => handleChange(e, 'title')} data-testid='input-title' />
      </label>
      <br />
      <label>
        author: <input value={author} onChange={e => handleChange(e, 'author')} data-testid='input-author' />
      </label>
      <br />
      <label>
        url: <input value={url} onChange={e => handleChange(e, 'url')} data-testid='input-url' />
      </label>
      <br />
      <button onClick={formSubmit} data-testid='button-submit'>Submit new blog</button>
    </Togglable>
  )
}

export default NewBlogForm