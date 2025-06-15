import { useContext } from "react"
import NotificationContext from "./NotificationContext"

export const initNotification = {
  msg: '',
  shown: false
}

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!notification.shown) return null

  return (
    <div style={style}>
      {notification.msg}
    </div>
  )
}

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTED':
      return {
        msg: `anecdote ${action.payload} voted for`,
        shown: true
      }
    case 'ADDED':
      return {
        msg: `${action.payload} added`,
        shown: true
      }
    case 'ERROR':
      const error = action.payload
      if (error.response?.status == 400) {
        return {
          msg: 'anecdote too short, must have at least 5 characters',
          shown: true,
        }
      }
      return {
        msg: 'server error',
        shown: true,
      }

    case 'CLEAR':
    default:
      return initNotification
  }
}

export default Notification
