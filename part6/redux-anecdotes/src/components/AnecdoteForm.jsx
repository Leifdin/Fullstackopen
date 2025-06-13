import { useDispatch } from "react-redux"
import { useState } from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newAnecdoteContent, setNewNoteContent] = useState('')
  const handleClick = async (e) => {
    e.preventDefault()
    if (newAnecdoteContent) {
      dispatch(createAnecdote(newAnecdoteContent))
      setNewNoteContent('')
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