import NewBlogForm from "../components/NewBlogForm";
import { useLogin } from "../hooks/useLogin";

const Home = () => {
  const [user, { logout }] = useLogin();
  return (
    <>
      user && <NewBlogForm />
    </>
  );
};
