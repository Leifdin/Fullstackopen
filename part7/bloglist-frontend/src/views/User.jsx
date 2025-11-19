import { Link, useNavigate } from "react-router";
import _ from "lodash";
import { H3, TableCell } from "../components/StyledComponents";
import { Table } from "react-bootstrap";

const User = ({ user }) => {
  const navigate = useNavigate();
  if (!user) return <div>User not found</div>;
  if (_.isEmpty(user)) return <div>loading...</div>;
  console.log(user);
  const hasBlogs = user.blogs?.length > 0;
  return (
    <div>
      <H3>{user.name}</H3>
      <h4>added blogs</h4>
      {hasBlogs ? (
        <Table striped bordered hover>
          <tbody>
            {user.blogs.map((blog) => (
              <tr key={blog.id}>
                <TableCell onClick={() => navigate(`/blogs/${blog.id}`)}>
                  {blog.title}
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <>no blogs</>
      )}
    </div>
  );
};
export default User;
