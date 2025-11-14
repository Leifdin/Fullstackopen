import { useBlogs } from "../hooks/useBlogs";
import Blog from "./Blog";

export const Blogs = ({ user }) => {
  const [blogs] = useBlogs();
  if (!user) return;
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};
