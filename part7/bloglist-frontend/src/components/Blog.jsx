import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, handleMessage, handleUpdate, loggedUser, handleDelete }) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    blogService.update(newBlog)
      .then(returnedBlog => {
        handleMessage({ type: 'success', text: `blog ${returnedBlog.title} by ${returnedBlog.author} was liked` })
        handleUpdate(returnedBlog)
      })
      .catch(e => {
        handleMessage({ type: 'error', text: e.message })
      })
  }
  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
        .then(() => {
          handleMessage({ type: 'delete', text: `blog ${blog.title} by ${blog.author} was deleted` })
          handleDelete(blog)
        })
        .catch(error => {
          console.log(error)
          handleMessage({type: 'error', text: `error deleting note`})
        })

    }
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} data-testid='visible'>
        {blog.author} {blog.title} <button onClick={toggleVisibility} data-testid='button-show'>Show</button><br />
      </div>
      <div style={showWhenVisible} data-testid='hidden'>
        {blog.author} <button onClick={toggleVisibility}>Hide</button><br />
        {blog.url}<br />
        {blog.likes} <button onClick={addLike} data-testid='button-like'>Like</button><br />
        {blog.user?.username}<br />
        {blog.user?.username === loggedUser.username && <button onClick={removeBlog}>Delete</button>}
      </div>
    </div>
  )
}

export default Blog