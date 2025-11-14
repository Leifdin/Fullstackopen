import Blog from "./Blog";

export const Blogs = ({
  blogs,
  handleUpdate,
  handleDelete,
  user,
}) => {
  if (!user) return;
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          loggedUser={user}
        />
      ))}
    </div>
  );
};
