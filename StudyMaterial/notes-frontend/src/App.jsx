import { useState, useEffect } from 'react'
import './App.css'
import Note from './components/Note.jsx'
import noteService from './services/notes'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col.js'
import CardGroup from 'react-bootstrap/CardGroup'




const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('A new note')
  const [showAll, setShowAll] = useState(true)

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
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Notes</h1>
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

      </Container>
      <Form>

        <Form.Group className="mb-3" controlId="saveNote" >
          <Row>
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
          </Row>
        </Form.Group>
      </Form>
    </Container>
    // <Container className='p-3'>
    //   <Row className="justify-content-center"><h1>Notes</h1></Row>
    //   <ul>
    // {notesToShow.map(note =>
    //   <Note
    //     key={note.id}
    //     note={note}
    //     toggleImportance={() => toggleImportanceOf(note.id)}
    //   />)}
    //   </ul>
    //   <div>
    //     <button onClick={() => setShowAll(!showAll)}>
    //       Show {showAll ? 'important' : 'all'}
    //     </button>
    //   </div>
    //   <Form>

    //   <Form.Group className="mb-3" controlId="saveNote" >
    //     <Form.Control type="text" placeholder="A new note" onChange={handleNoteChange}/>
    //     <Button variant="primary" type="submit" onClick={addNote}>Submit</Button>
    //   </Form.Group>

    //   </Form>
    // </Container>
  )
}
export default App
