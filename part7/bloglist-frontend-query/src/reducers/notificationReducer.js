import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShown: false,
  msg: "",
  type: "",
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        ...action.payload,
        isShown: true,
      };
    },
    clearNotification() {
      return initialState;
    },
  },
});
export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
