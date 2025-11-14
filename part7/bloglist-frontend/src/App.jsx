import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import _ from "lodash";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import { useNotify } from "./hooks/useNotify";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import { useBlogs } from "./hooks/useBlogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const notify = useNotify();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJson) {
      try {
        const user = JSON.parse(loggedUserJson);
        setUser(user);
        blogService.setToken(user.token);
      } catch {
        window.localStorage.clear();
      }
    }
  }, []);

  const handleChange = (e, field) => {
    const val = e.target.value;
    switch (field) {
      case "username":
        setUsername(val);
        break;
      case "password":
        setPassword(val);
        break;
    }
  };
  const handleAction = (event, action) => {
    event.preventDefault();
    switch (action) {
      case "login":
        if (!username || !password) {
          notify({
            type: "error",
            msg: "username or password missing",
          });
          return;
        }
        loginService
          .login({ username, password })
          .then((userData) => {
            setUser(userData);
            window.localStorage.setItem(
              "loggedBlogUser",
              JSON.stringify(userData),
            );
            blogService.setToken(userData.token);
            setTimeout(() => {
              handleAction(event, "logout");
              notify({
                type: "delete",
                msg: "user has been logged out",
              });
            }, [60 * 60 * 1000]);
          })
          .catch((e) => {
            notify({
              type: "error",
              msg: "invalid username or password",
            });
          });
        break;

      case "logout":
        setUser(null);
        blogService.setToken(null);
        window.localStorage.clear();
        break;
    }
  };

  return (
    <>
      <Notification />
      {user ? (
        <NewBlogForm />
      ) : (
        <LoginForm
          handleChange={handleChange}
          handleAction={handleAction}
          username={username}
          password={password}
        />
      )}
      <Blogs
        user={user}
      />
      {user && (
        <button onClick={(e) => handleAction(e, "logout")}>Logout</button>
      )}
    </>
  );
};

export default App;
