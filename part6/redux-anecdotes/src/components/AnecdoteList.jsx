import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const anecdotesToShow = prepAnecdotes(anecdotes, filter)
  const dispatch = useDispatch()
  return (
    <>{
      anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
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