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
  const [showNewBlog, setShowNewBlog] = useState('')

  const [message, setMessage] = useState(initMessage)

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
      // case 'title':
      //   setTitle(val)
      //   break
      // case 'author':
      //   setAuthor(val)
      //   break
      // case 'url':
      //   setUrl(val)
      //   break
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
      // case 'newBlog':
      //   if (!author || !title || !url){
      //     handleMessage({type: 'error', text: 'Required field(s) missing'})
      //   }
      //   const newBlog = {
      //     author: author,
      //     title: title,
      //     url: url,
      //   }
      //   blogService.add(newBlog)
      //     .then(returnedBlog => {
      //       setBlogs(blogs.concat(returnedBlog))
      //       setAuthor('')
      //       setTitle('')
      //       setUrl('')
      //       handleMessage({type: 'success', text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`})
      //     })
      //     .catch(e => {
      //       handleMessage({type: 'error', text: e.message})
      //     })


    }
  }

  const renderLogin = () => {
    if (!user) {
      return (
        // <div>
        //   <h2>login</h2>
        //   <label>
        //     Username: <input value={username} onChange={e => handleChange(e, 'username')} />
        //   </label>
        //   <label>
        //     Password: <input value={password} onChange={e => handleChange(e, 'password')} type='password' />
        //   </label>
        //   <br />
        //   <button onClick={e => handleAction(e, 'login')}>Submit</button>
        // </div>
        <LoginForm handleChange={handleChange} handleAction={handleAction} username={username} password={password} />

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