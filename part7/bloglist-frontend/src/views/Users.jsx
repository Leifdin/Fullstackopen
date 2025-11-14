import React from "react";
import { Link } from "react-router";

const Users = ({ users }) => {
  if (!users) return <>loading...</>;
  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {/* <a href={`/users/${user.id}`}>{user.name}</a> */}
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
