import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  shown: false,
  msg: ''
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        msg: action.payload,
        isShown: true,
      }
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})
export const { setNotification, clearNotification } = notificationSlice.actions

export const notifiy = (msg, timeout) => {
  return async dispatch => {
    dispatch(setNotification(msg))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer