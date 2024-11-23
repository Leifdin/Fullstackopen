import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './components/Note.jsx'
import noteService from './services/notes'



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

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const updatedNote = { ...note, important: !note.important}

    noteService
    .update(id, updatedNote)
    .then(returnedNote => {
      setNotes(notes.map(n => n.id != id ? n : returnedNote))
    })
    .catch(error => {
      alert(
        `The note '${note.content}' was already deleted from the server`
      )
      setNotes(notes.filter(n => n.id != id))
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
      important: Math.random() <0.5
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
  }
  const handleNoteChange = (event) => {
    /*
    console.log(event.target.value)
    */
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note =>
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} 
          />)}
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <form onSubmit={addNote}>
        <input
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
export default App
