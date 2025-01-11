import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import _ from 'lodash'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const initMessage = {
  text: '',
  type: '',
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [message, setMessage] = useState(initMessage)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(_.orderBy(blogs, 'likes', 'desc'))
    )

  }, [])
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson) {
      try {
        const user = JSON.parse(loggedUserJson)
        setUser(user)
        blogService.setToken(user.token)

      } catch {
        window.localStorage.clear()
      }

    }
  }, [])


  const handleChange = (e, field) => {
    const val = e.target.value
    switch (field) {
      case 'username':
        setUsername(val)
        break
      case 'password':
        setPassword(val)
        break
    }
  }
  const handleAction = (event, action) => {
    event.preventDefault()
    switch (action) {
      case 'login':
        if (!username || !password) {
          handleMessage({ type: 'error', text: 'username or password missing' })
          return
        }
        loginService.login({ username, password })
          .then(userData => {
            setUser(userData)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(userData))
            blogService.setToken(userData.token)
            setTimeout(() => {
              handleAction(event, 'logout')
              handleMessage({ type: 'delete', text: 'user has been logged out' })
            }, [60 * 60 * 1000])
          })
          .catch(e => {
            handleMessage({ type: 'error', text: 'invalid username or password' })
          })
        break

      case 'logout':
        setUser(null)
        blogService.setToken(null)
        window.localStorage.clear()
        break
    }
  }

  const renderLogin = () => {
    if (!user) {
      return (
        <LoginForm handleChange={handleChange} handleAction={handleAction} username={username} password={password} />

      )
    }
  }

  const renderContent = () => {
    if (user) {
      return (<div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleMessage={handleMessage}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            loggedUser={user}
          />
        )}
        <button onClick={e => handleAction(e, 'logout')}>Logout</button>
      </div>)
    }
  }

  const handleNewBlog = (title, author, url) => {
    if (!author || !title || !url) {
      handleMessage({ type: 'error', text: 'Required field(s) missing' })
    }
    const newBlog = {
      author: author,
      title: title,
      url: url,
    }
    blogService.add(newBlog)
      .then(returnedBlog => {
        const newBlogs = blogs.concat(returnedBlog)
        setBlogs(_.orderBy(newBlogs, 'likes', 'desc'))
        handleMessage({ type: 'success', text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added` })
      })
      .catch(e => {
        handleMessage({ type: 'error', text: e.message })
      })
  }

  const renderNewBlog = () => {
    if (user) {
      return (
        <NewBlogForm returnToParent={handleNewBlog} />
      )
    }
  }
  const handleUpdate = (updatedBlog) => {
    const newBlogArray = blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog)
    setBlogs(_.orderBy(newBlogArray, 'likes', 'desc'))
  }
  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(initMessage)
    }, 3500)
  }
  const handleDelete = (deletedBlog) => {
    const newBlogArray = blogs.filter(blog => blog.id !== deletedBlog.id)
    setBlogs(_.orderBy(newBlogArray, 'likes', 'desc'))
  }
  const renderMessage = () => {
    const style = message.type === 'success'
      ? { backgroundColor: ' #e6ffe6', color: '#003300', borderColor: '#003300' }
      : message.type === 'error'
        ? { backgroundColor: ' #ffe6e6', color: '#660000', borderColor: '#660000' }
      : message.type === 'delete'
      ? { backgroundColor: 'rgb(255, 255, 230)', color: 'rgb(131, 131, 0)', borderColor: 'rgb(131, 131, 0)', }
        : { display: 'none' }
    return (
      <div style={{ ...style, borderStyle: 'solid', borderRadius: '5px', padding: '5px' }}>
        <p>{message.text}</p>
      </div>
    )


  }

  return (
    <>
      {renderMessage()}
      {renderLogin()}
      {renderNewBlog()}
      {renderContent()}
    </>
  )
}

export default App