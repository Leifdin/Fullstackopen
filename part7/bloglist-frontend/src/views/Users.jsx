import React from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { H3, TableCell } from "../components/StyledComponents";

const Users = ({ users }) => {
  const navigate = useNavigate();
  if (!users) return <>loading...</>;
  return (
    <div>
      <H3>Users</H3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <TableCell onClick={() => navigate(`/users/${user.id}`)}>
                {user.name}
              </TableCell>
              <TableCell onClick={() => navigate(`/users/${user.id}`)}>
                {user.blogs?.length}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
