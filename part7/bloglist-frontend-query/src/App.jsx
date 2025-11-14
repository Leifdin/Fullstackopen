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
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "./requests";

const App = () => {
  const [user, { logout }] = useLogin();
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initNotification,
  );
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
  if (isPending) {
    return <div>loading...</div>;
  }
  if (isError) {
    console.log(error);
    return <div>blogs service is not available due to problems in server</div>;
  }
  console.log(data);

  return (
    <>
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <Notification />
        {user ? <NewBlogForm /> : <LoginForm />}
        <Blogs user={user} data={data} />
        {user && <button onClick={logout}>Logout</button>}
      </NotificationContext.Provider>
    </>
  );
};

export default App;
