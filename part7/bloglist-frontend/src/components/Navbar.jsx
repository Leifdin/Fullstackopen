import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div style={{ display: "flex", flexFlow: "row", gap: "15px" }}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </div>
  );
};

export default Navbar;
