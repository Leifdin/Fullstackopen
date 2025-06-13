import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
import { clearNotification, setNotification } from "./notificationReducer"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)
const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      return state.concat(asObject(action.payload))
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    voteFor(state, action) {
      const id = action.payload
      const noteToChange = state.find(note => note.id === id)
      const updatedNote = {
        ...noteToChange,
        votes: noteToChange.votes + 1
      }
      return state.map(note => note.id === id ? updatedNote : note)
    },
    updateAnecdote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    }
  }
})
export const { addAnecdote, appendAnecdote, setAnecdotes, voteFor, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(setNotification(`anecdote ${content} added`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)

  }
}
export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const updateObject = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    const updatedAnecdote = await anecdoteService.update(updateObject)
    dispatch(updateAnecdote(updatedAnecdote))
    dispatch(setNotification(`you voted '${updatedAnecdote?.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)

  }
}

export default anecdoteSlice.reducer