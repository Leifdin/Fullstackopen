import _ from "lodash";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import { useLogin } from "./hooks/useLogin";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import { Viewer } from "./views/Viewer";
import Navbar from "./components/Navbar";
import { Button, H2 } from "./components/StyledComponents";
import { Col, Row } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [user, { logout }] = useLogin();
  return (
    <Row
      style={{ background: "#c0c0c0ff", height: "100vh" }}
      className="justify-content-md-center"
    >
      <Col
        md="12"
        lg="8"
        style={{ background: "#fff", height: "95vh  ", padding: 0 }}
      >
        <Navbar />
        <div style={{ padding: "10px" }}>
          <Notification />
          <H2>blogs</H2>
          <LoginForm />
          <Viewer />
          {user && <Button onClick={logout}>Logout</Button>}
        </div>
      </Col>
    </Row>
  );
};

export default App;
