import React, { useRef, useState } from "react";
import Togglable from "./Togglable";
import { useBlogs } from "../hooks/useBlogs";
import { Button, H3, Input, Label } from "./StyledComponents";
import { Col, Row, Container } from "react-bootstrap";

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
  const [, { addNewBlog }] = useBlogs();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const newBlogFormRef = useRef();

  const formSubmit = () => {
    addNewBlog(author, title, url);
    newBlogFormRef.current.toggleVisibility();
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <Togglable buttonLabel="New blog" ref={newBlogFormRef}>
      <H3>new blog</H3>
      {/* <Container fluid> */}
      <div>
        <Row>
          <Col md="2" lg="1">
            <Label>title: </Label>
          </Col>
          <Col md="2" lg="1">
            <Input
              value={title}
              onChange={(e) => handleChange(e, "title")}
              data-testid="Input-title"
            />
          </Col>
        </Row>
        <Row>
          <Col md="2" lg="1">
            <Label>author: </Label>
          </Col>
          <Col md="2" lg="1">
            <Input
              value={author}
              onChange={(e) => handleChange(e, "author")}
              data-testid="Input-author"
            />
          </Col>
        </Row>
        <Row>
          <Col md="2" lg="1">
            <Label>url: </Label>
          </Col>
          <Col md="2" lg="1">
            <Input
              value={url}
              onChange={(e) => handleChange(e, "url")}
              data-testid="Input-url"
            />
          </Col>
        </Row>
      </div>
      {/* </Container>   */}
      <br />
      <Button onClick={formSubmit} data-testid="button-submit">
        Submit new blog
      </Button>
    </Togglable>
  );
};

export default NewBlogForm;
