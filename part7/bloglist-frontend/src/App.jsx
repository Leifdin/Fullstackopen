import _ from "lodash";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import { useLogin } from "./hooks/useLogin";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import { Viewer } from "./views/Viewer";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, { logout }] = useLogin();
  return (
    <>
      <Navbar />
      <Notification />
      <h2>blogs</h2>
      <LoginForm />
      <Viewer />
      {user && <button onClick={logout}>Logout</button>}
    </>
  );
};

export default App;
