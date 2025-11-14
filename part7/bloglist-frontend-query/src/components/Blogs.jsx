import { useBlogs } from "../hooks/useBlogs";
import Blog from "./Blog";

export const Blogs = ({ user, data }) => {
  if (!user) return;
  return (
    <div>
      <h2>blogs</h2>
      {data.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
