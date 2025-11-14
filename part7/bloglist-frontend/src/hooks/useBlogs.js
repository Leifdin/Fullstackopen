import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import {
  addBlog,
  deleteBlog,
  setBlogs,
  updateBlogs,
} from "../reducers/blogReducer";
import { useNotify } from "./useNotify";

export const useBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notify = useNotify();
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  const actions = {
    likeBlog: (blog) => {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      blogService
        .update(newBlog)
        .then((returnedBlog) => {
          notify({
            type: "success",
            msg: `blog ${returnedBlog.title} by ${returnedBlog.author} was liked`,
          });
          dispatch(updateBlogs(returnedBlog));
        })
        .catch((e) => {
          notify({ type: "error", msg: e.message });
        });
    },
    addNewBlog: (title, author, url) => {
      if (!author || !title || !url) {
        notify({ type: "error", msg: "Required field(s) missing" });
      }
      const newBlog = {
        author: author,
        title: title,
        url: url,
      };
      blogService
        .add(newBlog)
        .then((returnedBlog) => {
          dispatch(addBlog(returnedBlog));
          notify({
            type: "success",
            msg: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          });
        })
        .catch((e) => {
          notify({ type: "error", msg: e.message });
        });
    },
    removeBlog: (blog) => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        blogService
          .remove(blog.id)
          .then(() => {
            notify({
              type: "delete",
              msg: `blog ${blog.title} by ${blog.author} was deleted`,
            });
            dispatch(deleteBlog(blog));
          })
          .catch((error) => {
            console.log(error);
            notify({ type: "error", msg: `error deleting note` });
          });
      }
    },
  };
  return [blogs, actions];
};
