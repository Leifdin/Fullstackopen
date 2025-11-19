import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button, H3, Input, Label } from "./StyledComponents";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, { login }] = useLogin();
  if (user) {
    return <p style={{ fontSize: "large" }}>{user.name} logged in</p>;
  }
  return (
    <div>
      <H3>login</H3>
      <Label>
        Username:{" "}
        <Input
          data-testid="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Label>
      <Label>
        Password:{" "}
        <Input
          data-testid="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </Label>
      <br />
      <Button
        data-testid="login-confirm"
        onClick={() => login(username, password)}
      >
        Submit
      </Button>
    </div>
  );
};
export default LoginForm;
