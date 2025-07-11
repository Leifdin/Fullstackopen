import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      return initialState
    }
  }
})
export const {set, clear} = filterSlice.actions

export default filterSlice.reducer