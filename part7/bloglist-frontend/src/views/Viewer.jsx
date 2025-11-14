import React from "react";
import { Route, Routes, useMatch } from "react-router";
import { Home } from "./Home";
import Users from "./Users";
import User from "./User";
import Blog from "./Blog";
import { useResource } from "../hooks/useResource";
import { useBlogs } from "../hooks/useBlogs";

export const Viewer = () => {
  const users = useResource("http://localhost:3000/api/users", []);
  const matchUser = useMatch("/users/:id");
  const user = matchUser
    ? users.find((us) => us.id === matchUser.params.id)
    : {};
  const [blogs] = useBlogs();
  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((bl) => bl.id === matchBlog.params.id)
    : {};
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users users={users} />} />
      <Route path="/users/:id" element={<User user={user} />} />
      <Route path="/blogs/:id" element={<Blog blog={blog} />} />
    </Routes>
  );
};
