import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './components/Note.jsx'
import axios from 'axios'



const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('A new note')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    /*
    console.log('effect')
    */
    axios
    .get('http://localhost:3001/notes')
    .then(response => {
      /*
      console.log('Promise fulfilled')
      */
      setNotes(response.data)
    })
  }, [])
  /*
  console.log('render', notes.length, 'notes')
  */

  const toggleImportanceOf = (id) => {
    /*
    console.log(`The importance of ${id} needs to be toggled`)
    */
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const updatedNote = { ...note, important: !note.important}
    axios.put(url, updatedNote).then(response =>
      setNotes(notes.map(n => n.id != id ? n : response.data))
    )
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
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      /*
      console.log(response)
      */
      setNotes(notes.concat(response.data))
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
