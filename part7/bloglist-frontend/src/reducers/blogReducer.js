import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = [];
const blogsSlice = createSlice({
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
    updateBlogs(state, action) {
      const updatedBlog = action.payload;
      const newBlogArray = state
        .filter((blog) => blog.id !== updatedBlog.id)
        .concat(updatedBlog);
      return _.orderBy(newBlogArray, "likes", "desc");
    },
    deleteBlog(state, action) {
      const deletedBlog = action.payload;
      const newBlogArray = state.filter((blog) => blog.id !== deletedBlog.id);
      return _.orderBy(newBlogArray, "likes", "desc");
    },
    clearBlogs() {
      return initialState;
    },
  },
});
export const { setBlogs, addBlog, updateBlogs, deleteBlog, clearBlogs } =
  blogsSlice.actions;

export default blogsSlice.reducer;
