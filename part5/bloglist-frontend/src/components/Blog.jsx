import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, handleMessage, setReloadBlogs }) => {

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
    console.log(blog)
  }

  const addLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    blogService.update(newBlog)
      .then(returnedBlog => {
        setReloadBlogs(1)
        // handleMessage({ type: 'success', text: `blog ${returnedBlog.title} by ${returnedBlog.author} was liked` })
      })
      .catch(e => {
        handleMessage({ type: 'error', text: e.message })
      })
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.author} <button onClick={toggleVisibility}>Show</button><br />
      </div>
      <div style={showWhenVisible}>
        {blog.author} <button onClick={toggleVisibility}>Hide</button><br />
        {blog.url}<br />
        {blog.likes} <button onClick={addLike}>Like</button><br />
        {blog.user?.username}<br />
      </div>
    </div>
  )
}

export default Blog