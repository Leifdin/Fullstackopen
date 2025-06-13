import { useDispatch } from "react-redux"
import { useState } from "react"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"
import noteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newAnecdoteContent, setNewNoteContent] = useState('')
  const handleClick = async (e) => {
    e.preventDefault()
    if (newAnecdoteContent) {
      const newAnecdote = await noteService.createNew(newAnecdoteContent)
      console.log(newAnecdote)
      dispatch(appendAnecdote(newAnecdote))
      setNewNoteContent('')
      dispatch(setNotification(`anecdote ${newAnecdote?.content} added`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }
  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <input
            value={newAnecdoteContent}
            onChange={e => setNewNoteContent(e.target.value)} />
        </div>
        <button onClick={handleClick}>
          create
        </button>
      </form>
    </>
  )
}
export default AnecdoteForm