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
  const [reloadBlogs, setReloadBlogs] = useState(1)

  const [message, setMessage] = useState(initMessage)

  useEffect(() => {
    if(reloadBlogs){
      blogService.getAll().then(blogs =>
        setBlogs(_.orderBy(blogs, 'likes', 'desc'))
      )
      setReloadBlogs(0)
    }
    
  }, [reloadBlogs])
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
        if(!username || !password){
          handleMessage({type: 'error', text: 'username or password missing'})
          return
        }
        loginService.login({ username, password })
          .then(userData => {
            setUser(userData)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(userData))
            blogService.setToken(userData.token)
          })
          .catch(e => {
            handleMessage({type: 'error', text: 'invalid username or password'})
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
          <Blog key={blog.id} blog={blog} handleMessage={handleMessage} setReloadBlogs={setReloadBlogs}/>
        )}
        <button onClick={e => handleAction(e, 'logout')}>Logout</button>
      </div>)
    }
  }

  const handleNewBlog = (title, author, url) => {
    if (!author || !title || !url){
      handleMessage({type: 'error', text: 'Required field(s) missing'})
    }
    const newBlog = {
      author: author,
      title: title,
      url: url,
    }
    blogService.add(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        handleMessage({type: 'success', text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`})
      })
      .catch(e => {
        handleMessage({type: 'error', text: e.message})
      })
  }

  const renderNewBlog = () => {
    if (user) {
      return (
        <NewBlogForm returnToParent={handleNewBlog} />
      )
    }
  }
  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(initMessage)
    }, 3500)
  }
  const renderMessage = () => {
    const style = message.type === 'success'
      ? { backgroundColor: ' #e6ffe6', color: '#003300', borderColor: '#003300' }
      : message.type === 'error'
        ? { backgroundColor: ' #ffe6e6', color: '#660000', borderColor: '#660000' }
        : { display: 'none' }
    return (
      <div style={{...style, borderStyle: 'solid', borderRadius: '5px', padding: '5px'}}>
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