import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import _ from 'lodash'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // useEffect(() => {
  //   const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
  //   if (loggedUserJson !== null) {
  //       const userData = JSON.parse(loggedUserJson)
  //       setUser(userData)
  //       blogService.setToken(userData.token)
  // }
  // }, [])
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson) {
      try{
        const user = JSON.parse(loggedUserJson)
        setUser(user)
        c
        blogService.setToken(user.token)
      } catch {
        window.localStorage.clear()
      }
      
    }
  }, [])


  const handleChange = (e, field) => {
    switch (field) {
      case 'username':
        setUsername(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
    }
  }
  const handleAction = (event, action) => {
    event.preventDefault()
    switch (action) {
      case 'login':
        loginService.login({ username, password })
          .then(userData => {
            setUser(userData)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(userData))
            blogService.setToken(userData.token)
          })
          .catch(e => console.log(e.message))
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
        <div>
          <h2>login</h2>
          <label>
            Username: <input value={username} onChange={e => handleChange(e, 'username')} />
          </label>
          <label>
            Password: <input value={password} onChange={e => handleChange(e, 'password')} type='password' />
          </label>
          <br />
          <button onClick={e => handleAction(e, 'login')}>Submit</button>
        </div>

      )
    }
  }

  const renderContent = () => {
    if (user) {
      return (<div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <button onClick={e => handleAction(e, 'logout')}>Logout</button>
      </div>)
    }
  }

  return (
    <>
      {renderLogin()}
      {renderContent()}
    </>
  )
}

export default App