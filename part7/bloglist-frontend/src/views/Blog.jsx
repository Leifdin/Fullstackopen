import { useParams } from "react-router";
import { useResource } from "../hooks/useResource";
import _ from "lodash";
import { useBlogs } from "../hooks/useBlogs";
import { useLogin } from "../hooks/useLogin";

const Blog = ({ blog }) => {
  const params = useParams();
  const [, { likeBlog, removeBlog }] = useBlogs();
  const [user] = useLogin();
  if (!blog) return <div>User not found</div>;
  if (_.isEmpty(blog)) return <div>loading...</div>;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.author}
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
