import { useState, useEffect } from 'react'
import './App.css'
import Note from './components/Note.jsx'
import noteService from './services/notes'
import loginService from './services/login.js'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardGroup from 'react-bootstrap/CardGroup'
import InputGroup from 'react-bootstrap/InputGroup'

const initNoteData = {
  content: '',
  important: true,
}


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(initNoteData)
  const [showAll, setShowAll] = useState(true)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

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

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


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
      })
      .catch(error => {
        if (error.response.status === 401) {
          handleError('Log in to add notes')
        } else {
          handleError(error.errorMessage)
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
  const handleError = (error) => {
    setErrorMessage(error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const handleLogin = (event) => {
    event.preventDefault
    loginService.login({ username, password })
      .then(user => {
        setUser(user)
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
        noteService.setToken(user.token)
        setUserName('')
        setPassword('')
      })
      .catch(() => {
        setErrorMessage('Wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.clear()
  }

  const renderUser = () => {
    return (
      <>
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
            aria-describedby="basic-addon1"
            onChange={(event) => handleChange(event, 'NOTE-CONTENT')}
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
      </>
    )
  }

  const renderLogin = () => {
    return (
      <InputGroup>
        <InputGroup.Text>Username:</InputGroup.Text>
        <Form.Control
          onChange={(event) => handleChange(event, 'USER')}
          value={username}
          placeholder='Log in to add notes'
        />
        <InputGroup.Text>Password:</InputGroup.Text>
        <Form.Control
          onChange={(event) => handleChange(event, 'PASS')}
          value={password}
          type='password'
        />
        <Button
          variant="primary"
          type="submit"
          onClick={handleLogin}
        >
          Submit
        </Button>
        
      </InputGroup>
    )
  }

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Notes</h1>
        <br />
        {errorMessage &&
          <Row style={{ margin: "0 5px 10px 5px", position: 'fixed', top: '15px', zIndex: '2' }}>
            <Col
              xs={12}
              style={{ background: '#FAA0A0', }}>
              <b style={{ fontSize: '25px', padding: '5px 0', }}>{errorMessage}</b>
            </Col>
          </Row>}
        <CardGroup>
          <Row md={3} className="g-4">
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
          </Row>

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
