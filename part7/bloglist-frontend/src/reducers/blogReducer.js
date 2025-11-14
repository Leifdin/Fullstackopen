import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = [];
const notificationSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return _.orderBy(action.payload, "likes", "desc");
    },
    addBlog(state, action) {
      const newState = state.concat(action.payload);
      return _.orderBy(newState, "likes", "desc");
    },
    clearBlogs() {
      return initialState;
    },
  },
});
export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
