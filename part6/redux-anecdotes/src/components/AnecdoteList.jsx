import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const anecdotesToShow = prepAnecdotes(anecdotes, filter)
  const dispatch = useDispatch()

  const handleButton = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
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
            <button onClick={() => handleButton(anecdote)}>vote</button>
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