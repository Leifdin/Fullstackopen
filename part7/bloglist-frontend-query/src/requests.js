import axios from "axios";

const baseUrl = "http://localhost:3000/api/blogs";
export const getAllBlogs = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
