import { useParams } from "react-router";
import { useResource } from "../hooks/useResource";
import _ from "lodash";
import { useBlogs } from "../hooks/useBlogs";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

const Blog = ({ blog }) => {
  const params = useParams();
  const [, { likeBlog, removeBlog, addComment }] = useBlogs();
  const [user] = useLogin();
  const [newComment, setNewComment] = useState("");

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
      <div>
        <div>
          <h2>comments</h2>
          {blog.comments.length > 0 ? (
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment}>{comment}</li>
              ))}
            </ul>
          ) : (
            <>no comments yet</>
          )}
        </div>
        <div>
          <input
            value={newComment}
            placeholder="add new comment"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={() => {
              addComment(blog, newComment);
              setNewComment("");
            }}
          >
            submit comment
          </button>
        </div>
      </div>
    </div>
  );
};
export default Blog;
