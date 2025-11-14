import React, { useContext } from "react";
import { useState } from "react";
import UserContext from "../context/UserContext";
import { useNotify } from "../hooks/useNotify";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [, userDispatch] = useContext(UserContext);
  const notify = useNotify();
  const login = (username, password) => {
    console.log("idem");
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
        userDispatch({ type: "SET", payload: userData });
        notify({
          type: "success",
          msg: `user ${userData.username} logged in`,
        });
        window.localStorage.setItem("loggedBlogUser", JSON.stringify(userData));
        blogService.setToken(userData.token);
        setTimeout(() => {
          userDispatch({ type: "LOGOUT" });
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
  };
  return (
    <div>
      <h2>login</h2>
      <label>
        Username:{" "}
        <input
          data-testid="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:{" "}
        <input
          data-testid="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </label>
      <br />
      <button
        data-testid="login-confirm"
        onClick={() => login(username, password)}
      >
        Submit
      </button>
    </div>
  );
};
export default LoginForm;
