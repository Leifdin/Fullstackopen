import { Link, useNavigate } from "react-router";
import { useBlogs } from "../hooks/useBlogs";
import { Table } from "react-bootstrap";
import { BlogLink, TableCell } from "./StyledComponents";

export const Blogs = ({ user }) => {
  const [blogs] = useBlogs();
  const navigate = useNavigate();
  if (!user) return;
  return (
    <Table striped bordered hover>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <TableCell
              style={{ cursor: "pointer", padding: "" }}
              onClick={() => navigate(`/blogs/${blog.id}`)}
            >
              {blog.title}
            </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
