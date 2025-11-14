import React from "react";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
const Navbar = () => {
  const navigate = useNavigate();
  const NavLink = styled(Link)`
    font-size: 1.5em;
    color: white;
    text-decoration: none;
    cursor: pointer;
    text-transform: uppercase;
    padding: 10px;
    &:hover,
    &:focus {
      background: #838383ff;
      color: #c4c4c4ff;
    }
  `;
  const NavDiv = styled.div`
    display: flex;
    flex-flow: row;
    padding: 5px;
    background: #505050;
  `;
  return (
    <NavDiv>
      <NavLink to="">blogs</NavLink>
      <NavLink to="/users">users</NavLink>
    </NavDiv>
  );
};

export default Navbar;
