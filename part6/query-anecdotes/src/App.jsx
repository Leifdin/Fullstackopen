import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification, { initNotification, notificationReducer } from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
   
  })
  const [notification, notificationDispatch] = useReducer(notificationReducer, initNotification)

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: 'VOTED', payload: anecdote.content })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })
  if (isPending) {
    return (<div>loading...</div>)
  }
  if (isError) {
    return <div>anecdote service is not available due to problems in server</div>
  }
  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <Notification />
        <AnecdoteForm />
      </NotificationContext.Provider>

      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
