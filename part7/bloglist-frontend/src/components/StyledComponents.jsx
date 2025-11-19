import { Link } from "react-router";
import styled from "styled-components";
export const H2 = styled.h2`
  font-weigth: bold;
  text-transform: uppercase;
  padding: 10px;
`;
export const H3 = styled.h3`
  font-weight: normal;
  text-transform: capitalize;
  padding: 15px;
  font-size: x-large;
`;

export const H4 = styled.h4`
  font-style: italic;
  font-size: large;
`;

export const Button = styled.button`
  border: none;
  padding: 5px;
  font-size: 1.2em;
  margin: 10px;
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  background: #504242ff;
`;
export const Label = styled.label`
  margin: 10px;
  font-size: 1.2em;
  text-transform: capitalize;
`;
export const TableCell = styled.td`
  cursor: pointer;
  padding: 5px 10px;
`;

export const Input = styled.input`
  height: 25px;
  // border: 1px solid #332b2bff;
  border: none;
  padding: 2px 5px;
  height: 35px;
  border-radius: 5px;
  background: #f5d4d4ff;
  margin: 5px;
`;

export const BlogLink = styled(Link)`
  font-size: 1.2em;
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    background: #c0c0c0ff;
    color: black;
  }
`;

export const NotificationBody = styled.div`
  border: 1px solid;
  padding: 10px;
  position: fixed;
  top: 75px;
  right: 10px;
  opacity: 0.75;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
