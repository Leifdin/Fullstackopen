import { useState, useEffect } from 'react'
import './App.css'
import Note from './components/Note.jsx'
import noteService from './services/notes'
import loginService from './services/login.js'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CardGroup from 'react-bootstrap/CardGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Message from './components/Message.jsx'

const initNoteData = {
  content: '',
  important: true,
}
export const initMessage = { isShown: false, msg: '', type: '', timeout: 0 }


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(initNoteData)
  const [showAll, setShowAll] = useState(true)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(initMessage)

  /**
   * Downloads notes from db
   */
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
      .catch((error) => {
        console.log(error)
        handleError('Error connecting to database')
      })
  }, [])

  /**
   * Gets user info from storage
   */
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  /**
   * Handles message interval
   */
  // useEffect(() => {
  //   console.log(messageTimer)
  //   const t = new Date()
  //   if (t < messageTimer) {
  //     setTimeout(() => {
  //       setMessageTimer(messageTimer + 100)
  //     }, 100)
  //   } else {
  //     setMessage(initMessage)
  //     setMessageTimer(0)
  //   }
  // }, [message])


  const toggleImportanceOf = (e, id) => {
    e.preventDefault()
    const note = notes.find(n => n.id === id)
    const updatedNote = { ...note, important: !note.important }
    noteService
      .update(id, updatedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id != id ? n : returnedNote))
      })
      .catch(error => {
        if (!error.response.status) {
          alert('Error communicating with server')
        }
        if (error.response.status === 401) {
          alert(`User can only change their own notes`)
        } else if (error.response.status === 404) {
          alert(`The note '${note.content}' was already deleted from the server`)
          setNotes(notes.filter(n => n.id != id))
        }
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    noteService
      .create(newNote)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote(initNoteData)
        handleInfo(`${returnedNote.content} added`)
      })
      .catch(error => {
        if (error.response.status === 401) {
          handleError('Log in to add notes')
        } else {
          handleError(error.message)
        }
      })
  }
  /**
   * handles input field change
   * @param {event} event 
   * @param {String} type NOTE/PASS/USER 
   */
  const handleChange = (event, type) => {
    switch (type) {
      case 'NOTE-CONTENT':
        setNewNote({ content: event.target.value, important: newNote.important })
        break
      case 'NOTE-IMPORTANT':
        setNewNote({ content: newNote.content, important: !newNote.important })
        break
      case 'PASS':
        setPassword(event.target.value)
        break
      case 'USER':
        setUserName(event.target.value)
        break
    }
  }
  const handleError = (message, timeout = 5000) => {
    // setMessageTimer(0)
    setMessage({ type: 'error', msg: message, isShown: true, timeout })
  }
  const handleInfo = (message, timeout = 5000) => {
    // setMessageTimer(0)
    setMessage({ type: 'info', msg: message, isShown: true, timeout })
  }
  const handleLogin = (event) => {
    event.preventDefault()
    loginService.login({ username, password })
      .then(user => {
        setUser(user)
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
        noteService.setToken(user.token)
        setUserName('')
        setPassword('')
        handleInfo(`${user.name} logged in`)
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          handleError('Wrong username or password')
        } else {
          console.log(error.message)
          handleError(error.message)
          console.log(error)
        }
      })
  }

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.clear()
    handleInfo(`${user.name} logged out successfully`)
  }

  const renderUser = () => {
    return (
      <Form onSubmit={addNote}>
        <InputGroup className='mb-3'>
          <InputGroup.Text>Username:</InputGroup.Text>
          <Form.Control
            value={user.username}
            disabled={true}
          />
          <Button variant="primary" type="submit" onClick={handleLogout}>Log out</Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">New note:</InputGroup.Text>
          <Form.Control
            placeholder="Type new note here"
            onChange={(event) => handleChange(event, 'NOTE-CONTENT')}
            data-testid='new-note'
            value={newNote.content}
          />
          <Form.Check
            label='Important'
            style={{ fontSize: 'large', margin: '0 10px' }}
            checked={newNote.important}
            onChange={(event) => handleChange(event, 'NOTE-IMPORTANT')}
          />
          <Button variant="primary" type="submit" onClick={addNote}>Submit</Button>
          {/* <Button variant="danger" onClick={() => console.log(newNote)}>Debug   </Button> */}
        </InputGroup>
      </Form>
    )
  }

  const renderLogin = () => {
    return (
      <Form onSubmit={handleLogin}>
        <InputGroup>
          <InputGroup.Text>Username:</InputGroup.Text>
          <Form.Control
            onChange={(event) => handleChange(event, 'USER')}
            value={username}
            placeholder='Log in to add notes'
            data-testid='username'
          />
          <InputGroup.Text>Password:</InputGroup.Text>
          <Form.Control
            onChange={(event) => handleChange(event, 'PASS')}
            value={password}
            type='password'
            data-testid='password'
          />
          <Button
            variant="primary"
            type="submit"
            onClick={handleLogin}
          >
            Submit
          </Button>

        </InputGroup>
      </Form>
    )
  }

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Notes</h1>
        <h6 className='header'>Pavol Polonec</h6>
        <br />
        <Message message={message} setMessage={setMessage} />

        <CardGroup>
            {notesToShow.map((note, index) => {
              const isDisabled = (!note.user || !user)
                ? true
                : note.user.username === user.username
                  ? false
                  : true
              return (<Note
                key={note.id}
                note={note}
                toggleImportance={(e) => toggleImportanceOf(e, note.id)}
                index={index}
                disabled={isDisabled}
              />)
            })}
        </CardGroup>
        <Row style={{ padding: '0 15px' }}>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Show only important"
            onChange={() => setShowAll(!showAll)}
            value={showAll}
          />
        </Row>

      </Container>
      {user ? renderUser() : renderLogin()}
      {/* <Form>

        <FormControl>

        </FormControl>
          
            <Col md='auto'><
              Form.Control type="text" placeholder="A new note" onChange={handleNoteChange} />
            </Col>
            <Col md='auto'>
              <Button variant="primary" type="submit" onClick={addNote}>Submit</Button>
            </Col>
            <Col md='auto'>
              <Button
                variant={showAll ? "primary" : "secondary"}
                onClick={() => setShowAll(!showAll)}>
                Show {showAll ? 'important' : 'all'}
              </Button>
            </Col>
          
        </Form.Group>
      </Form> */}
    </Container>
  )
}
export default App
