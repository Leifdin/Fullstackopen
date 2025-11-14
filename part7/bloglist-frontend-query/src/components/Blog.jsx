import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
import { useLogin } from "../hooks/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotify } from "../hooks/useNotify";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const [user] = useLogin();
  const queryClient = useQueryClient();
  const notify = useNotify();
  const delBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notify({
        type: "delete",
        msg: `blog ${blog.title} by ${blog.author} was deleted`,
      });
    },
    onError: (error) => {
      notify({ type: "error", msg: error.message });
    },
  });
  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notify({
        type: "success",
        msg: `blog ${returnedBlog.title} by ${returnedBlog.author} was liked`,
      });
    },
    onError: (error) => {
      notify({ type: "error", msg: error.message });
    },
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeBlog = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlogMutation.mutate(newBlog);
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} data-testid="visible">
        {blog.author} {blog.title}{" "}
        <button onClick={toggleVisibility} data-testid="button-show">
          Show
        </button>
        <br />
      </div>
      <div style={showWhenVisible} data-testid="hidden">
        {blog.author} <button onClick={toggleVisibility}>Hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes}{" "}
        <button onClick={likeBlog} data-testid="button-like">
          Like
        </button>
        <br />
        {user?.username}
        <br />
        {user?.username === user.username && (
          <button onClick={() => delBlogMutation.mutate(blog.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
