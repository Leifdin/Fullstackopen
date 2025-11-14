import _ from "lodash";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import { useLogin } from "./hooks/useLogin";

const App = () => {
  const [user, { logout }] = useLogin();

  return (
    <>
      <Notification />
      {user ? <NewBlogForm /> : <LoginForm />}
      <Blogs user={user} />
      {user && <button onClick={logout}>Logout</button>}
    </>
  );
};

export default App;
