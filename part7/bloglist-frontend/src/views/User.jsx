import { Link } from "react-router";
import _ from "lodash";

const User = ({ user }) => {
  if (!user) return <div>User not found</div>;
  if (_.isEmpty(user)) return <div>loading...</div>;
  console.log(user);
  const hasBlogs = user.blogs?.length > 0;
  return (
    <div>
      <h1>{user.name}</h1>
      <h4>added blogs</h4>
      {hasBlogs ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <>no blogs</>
      )}
    </div>
  );
};
export default User;
