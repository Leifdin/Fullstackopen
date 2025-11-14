import { useContext, useEffect } from "react";
import { useNotify } from "./useNotify";
import { clearUser, setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import UserContext from "../context/UserContext";

export const useLogin = () => {
  const [user, dispatch] = useContext(UserContext) ?? [];
  const notify = useNotify();
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJson) {
      try {
        const user = JSON.parse(loggedUserJson);
        dispatch({ type: "SET", payload: user });
        blogService.setToken(user.token);
      } catch {
        window.localStorage.clear();
      }
    }
  }, [dispatch]);
  const logout = () => {
    dispatch(clearUser());
    blogService.setToken(null);
    window.localStorage.clear();
  };
  const actions = {
    login: (username, password) => {
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
          dispatch(setUser(userData));
          notify({
            type: "success",
            msg: `user ${userData.username} logged in`,
          });
          window.localStorage.setItem(
            "loggedBlogUser",
            JSON.stringify(userData),
          );
          blogService.setToken(userData.token);
          setTimeout(() => {
            logout();
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
    },
    logout,
  };
  return [user, actions];
};
