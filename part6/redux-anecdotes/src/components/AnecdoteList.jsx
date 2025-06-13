import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const anecdotesToShow = prepAnecdotes(anecdotes, filter)
  const dispatch = useDispatch()

  const handleButton = (id, content) => {
    dispatch(voteFor(id))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  return (
    <>{
      anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleButton(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}</>
  )
}
const prepAnecdotes = (anecdotes, filter) => {
  let anecdotesToShow = _.orderBy(anecdotes, ['votes'], ['desc'])
  anecdotesToShow = anecdotesToShow.filter(anecdote => anecdote.content.includes(filter))
  return anecdotesToShow
}
export default AnecdoteList