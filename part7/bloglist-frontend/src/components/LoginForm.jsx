import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, { login }] = useLogin();
  if (user) {
    return <p style={{ fontSize: "large" }}>{user.name} logged in</p>;
  }
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
