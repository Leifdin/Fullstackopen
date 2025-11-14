import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
import { useLogin } from "../hooks/useLogin";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const [, { likeBlog, removeBlog }] = useBlogs();
  const [user] = useLogin();

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
        <button onClick={() => likeBlog(blog)} data-testid="button-like">
          Like
        </button>
        <br />
        {user?.username}
        <br />
        {user?.username === user.username && (
          <button onClick={() => removeBlog(blog)}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
