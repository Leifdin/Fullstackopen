import axios from 'axios'
const env = process.env.NODE_ENV
const baseUrl = env === 'dev' ? 'http://localhost:3000/api/blogs' : '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = (newBlog) => {
  const request = axios.post(baseUrl, newBlog, { headers: { Authorization: token } })
  return request.then(response => response.data)

}
const update = (updatedBlog) => {
  return axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, { headers: { Authorization: token } })
    .then(response => response.data)
}
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
    .then(response => response.data)
}



export default { getAll, setToken, add, update, remove }