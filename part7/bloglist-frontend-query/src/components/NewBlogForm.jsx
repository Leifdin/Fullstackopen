import React, { useRef, useState } from "react";
import Togglable from "./Togglable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotify } from "../hooks/useNotify";

const NewBlogForm = () => {
  const handleChange = (e, field) => {
    const val = e.target.value;
    switch (field) {
      case "title":
        setTitle(val);
        break;
      case "author":
        setAuthor(val);
        break;
      case "url":
        setUrl(val);
        break;
    }
  };
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const notify = useNotify();

  const newBlogFormRef = useRef();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.add,
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notify({
        type: "success",
        msg: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      });
    },
    onError: (error) => {
      notify({ type: "error", msg: error.message });
    },
  });
  const formSubmit = () => {
    if (!author || !title || !url) {
      notify({ type: "error", msg: "Required field(s) missing" });
      return;
    }
    setAuthor("");
    setTitle("");
    setUrl("");
    const newBlog = {
      author: author,
      title: title,
      url: url,
    };
    newBlogMutation.mutate(newBlog);
  };

  return (
    <Togglable buttonLabel="New blog" ref={newBlogFormRef}>
      <h2>new blog</h2>
      <label>
        title:{" "}
        <input
          value={title}
          onChange={(e) => handleChange(e, "title")}
          data-testid="input-title"
        />
      </label>
      <br />
      <label>
        author:{" "}
        <input
          value={author}
          onChange={(e) => handleChange(e, "author")}
          data-testid="input-author"
        />
      </label>
      <br />
      <label>
        url:{" "}
        <input
          value={url}
          onChange={(e) => handleChange(e, "url")}
          data-testid="input-url"
        />
      </label>
      <br />
      <button onClick={formSubmit} data-testid="button-submit">
        Submit new blog
      </button>
    </Togglable>
  );
};

export default NewBlogForm;
