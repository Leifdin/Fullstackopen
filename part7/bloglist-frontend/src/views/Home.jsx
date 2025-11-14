import { Blogs } from "../components/Blogs";
import NewBlogForm from "../components/NewBlogForm";
import { useLogin } from "../hooks/useLogin";

export const Home = () => {
  const [user] = useLogin();
  return (
    <>
      {user && <NewBlogForm />}
      <Blogs user={user} />
    </>
  );
};
