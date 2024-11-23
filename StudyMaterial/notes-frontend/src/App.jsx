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




const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('A new note')
  const [showAll, setShowAll] = useState(true)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    /*
    console.log('effect')
    */
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  /*
  console.log('render', notes.length, 'notes')
  */

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
    /*
    console.log('Button clicked', event.target)
    */
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    /*
    setNotes(notes.concat(noteObject))
    setNewNote('')
    */
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      .catch(error => {
        if (error.response.status === 401) {
          alert('Log in to add notes')
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
      case 'NOTE':
        setNewNote(event.target.value)
        break
      case 'PASS':
        setPassword(event.target.value)
        break
      case 'USER':
        setUserName(event.target.value)
        break
    }
  }

  const handleLogin = (event) => {
    event.preventDefault
    loginService.login({ username, password })
      .then(user => {
        setUser(user)
        setUserName('')
        setPassword('')
      })
      .catch(exception => {
        setErrorMessage('Wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Notes</h1>
        <br />
        {errorMessage &&
          <Row style={{ margin: "0 5px 10px 5px" }}>
            <Col
              xs={12}
              style={{ background: '#FAA0A0', }}>
              <b style={{ fontSize: '25px', padding: '5px 0',}}>{errorMessage}</b>
            </Col>
          </Row>}
        <CardGroup>
          <Row md={3} className="g-4">
            {notesToShow.map((note, index) =>
              <Note
                key={note.id}
                note={note}
                toggleImportance={(e) => toggleImportanceOf(e, note.id)}
                index={index}
              />)}
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
      {user &&
        <>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Username:</InputGroup.Text>
            <Form.Control
              value={user}
              disabled={true}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">New note:</InputGroup.Text>
            <Form.Control
              placeholder="Type new note here"
              aria-describedby="basic-addon1"
              onChange={(event) => handleChange(event, 'NOTE')}
            />
            <Button variant="primary" type="submit" onClick={addNote}>Submit</Button>
          </InputGroup>
        </>}
      {!user &&
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
      }

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
