import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog }) => {

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
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.author} <button onClick={toggleVisibility}>Show</button><br/>
      </div>
      <div style={showWhenVisible}>
      {blog.author} <button onClick={toggleVisibility}>Hide</button><br/>
        {blog.url}<br/>
        {blog.likes} <button>Like</button><br/>
        {blog.author}<br/>
      </div>
    </div>
  )
}

export default Blog