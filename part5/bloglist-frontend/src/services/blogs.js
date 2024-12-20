import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = (newBlog) => {
  const request = axios.post(baseUrl, newBlog, { headers: {Authorization: token }})
  return request.then(response => response.data)
  
}

export default { getAll, setToken, add }