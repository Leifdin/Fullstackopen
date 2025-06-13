import { useDispatch } from "react-redux"
import { useState } from "react"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newNoteContent, setNewNoteContent] = useState('')
  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <input
            value={newNoteContent}
            onChange={e => setNewNoteContent(e.target.value)} />
        </div>
        <button onClick={e => {
          e.preventDefault()
          if (newNoteContent) {
            dispatch(newNote(newNoteContent))
            setNewNoteContent('')
          }
        }}>
          create
        </button>
      </form>
    </>
  )
}
export default AnecdoteForm