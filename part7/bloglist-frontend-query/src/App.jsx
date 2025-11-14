import _ from "lodash";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import NotificationContext from "./context/NotificationContext";
import { useEffect, useReducer } from "react";
import {
  initNotification,
  notificationReducer,
} from "./reducers/newNotificationReducer";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";
import UserContext from "./context/UserContext";
import { userReducer } from "./reducers/newUserReducer";

const App = () => {
  // const [user, { logout }] = useLogin();
  const [user, userDispatch] = useReducer(userReducer, null);
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJson) {
      try {
        const tmpUser = JSON.parse(loggedUserJson);
        userDispatch({ type: "SET", payload: tmpUser });
        blogService.setToken(user.token);
      } catch {
        window.localStorage.clear();
      }
    }
  }, []);
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initNotification,
  );
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  if (isPending) {
    return <div>loading...</div>;
  }
  if (isError) {
    console.log(error);
    return <div>blogs service is not available due to problems in server</div>;
  }

  return (
    <>
      <UserContext.Provider value={[user, userDispatch]}>
        <NotificationContext.Provider
          value={[notification, notificationDispatch]}
        >
          <Notification />
          {user ? <NewBlogForm /> : <LoginForm />}
          <Blogs user={user} data={_.orderBy(data, "likes", "desc")} />
          {user && (
            <button onClick={() => userDispatch({ type: "LOGOUT" })}>
              Logout
            </button>
          )}
        </NotificationContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
