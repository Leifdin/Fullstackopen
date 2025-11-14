import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

export const initBlogData = {
  author: "",
  url: "",
  title: "",
  likes: 0,
};

const blog = {
  author: "TesterFester",
  url: "www.test.sk",
  title: "Testing blog",
  likes: 0,
  user: {
    username: "testerowski",
  },
};

const loggedUser = {
  username: "testerowski",
};

test("renders content", () => {
  render(<Blog blog={blog} loggedUser={loggedUser} />);

  const visible = screen.getByTestId("visible");
  expect(visible).toBeDefined();
  expect(visible).toHaveTextContent("TesterFester");
  expect(visible).toHaveTextContent("Testing blog");
  expect(visible).not.toHaveTextContent("www.test.sk");
});

test("show button works", async () => {
  render(<Blog blog={blog} loggedUser={{ username: "testerowski" }} />);
  const button = screen.getByTestId("button-show");
  expect(button).toBeDefined();
  const user = userEvent.setup();
  await user.click(button);
  const hidden = screen.getByTestId("hidden");
  expect(hidden).not.toHaveStyle("display: none");
  expect(hidden).toHaveTextContent("www.test.sk");
  expect(hidden).toHaveTextContent("0");
});

test("clicking like button twice triggers event handler twice", async () => {
  render(
    <Blog
      blog={blog}
      loggedUser={{ username: "testerowski" }}
      handleMessage={(e) => console.log()}
    />,
  );
  const button = screen.getByTestId("button-show");
  expect(button).toBeDefined();
  const user = userEvent.setup();
  await user.click(button);
  const likeButton = screen.getByTestId("button-like");
  expect(likeButton).toBeDefined();

  // const likeBlog = vi.fn()
  const likeBlog = vi.fn();
  likeButton.onclick = () => likeBlog();
  await user.click(likeButton);
  await user.click(likeButton);
  // await user.click(likeButton)
  expect(likeBlog.mock.calls).toHaveLength(2);
});
