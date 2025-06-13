import { useDispatch } from "react-redux"
import { useState } from "react"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newAnecdoteContent, setNewNoteContent] = useState('')
  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <input
            value={newAnecdoteContent}
            onChange={e => setNewNoteContent(e.target.value)} />
        </div>
        <button onClick={e => {
          e.preventDefault()
          if (newAnecdoteContent) {
            dispatch(addAnecdote(newAnecdoteContent))
            setNewNoteContent('')
            dispatch(setNotification(`anecdote ${newAnecdoteContent} added`))
            setTimeout(() => {
              dispatch(clearNotification())
            }, 5000)
          }
        }}>
          create
        </button>
      </form>
    </>
  )
}
export default AnecdoteForm