import { useParams } from "react-router";
import { useResource } from "../hooks/useResource";
import _ from "lodash";
import { useBlogs } from "../hooks/useBlogs";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import {
  BlogLink,
  Button,
  H3,
  H4,
  Input,
} from "../components/StyledComponents";

const Blog = ({ blog }) => {
  const [, { likeBlog, removeBlog, addComment }] = useBlogs();
  const [user] = useLogin();
  const [newComment, setNewComment] = useState("");

  if (!blog) return <div>User not found</div>;
  if (_.isEmpty(blog)) return <div>loading...</div>;
  return (
    <div>
      <div>
        <H3>{blog.title}</H3>
        <H4> by {blog.author}</H4>
        <br />
        <BlogLink>{blog.url}</BlogLink>
        <br />
        Likes: {blog.likes} <br />
        <Button onClick={() => likeBlog(blog)} data-testid="button-like">
          Like
        </Button>
        {user &&  user.username === user.username && (
          <Button onClick={() => removeBlog(blog)}>Delete</Button>
        )}
      </div>
      <div>
        <div>
          <H3>comments</H3>
          {blog?.comments?.length > 0 ? (
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
          <Input
            value={newComment}
            placeholder="add new comment"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            onClick={() => {
              addComment(blog, newComment);
              setNewComment("");
            }}
          >
            submit comment
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Blog;
