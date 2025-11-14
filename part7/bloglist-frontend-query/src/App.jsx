import _ from "lodash";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import { useLogin } from "./hooks/useLogin";
import NotificationContext from "./context/NotificationContext";
import { useReducer } from "react";
import {
  initNotification,
  notificationReducer,
} from "./reducers/newNotificationReducer";

const App = () => {
  const [user, { logout }] = useLogin();
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initNotification,
  );

  return (
    <>
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <Notification />
        {user ? <NewBlogForm /> : <LoginForm />}
        <Blogs user={user} />
        {user && <button onClick={logout}>Logout</button>}
      </NotificationContext.Provider>
    </>
  );
};

export default App;
