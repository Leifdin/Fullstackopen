import { Link } from "react-router";
import { useBlogs } from "../hooks/useBlogs";

export const Blogs = ({ user }) => {
  const [blogs] = useBlogs();
  if (!user) return;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};
