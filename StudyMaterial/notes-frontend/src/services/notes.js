import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const baseUrl = '/api/notes'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = (newObject) => {
  return axios.post(baseUrl, newObject, { headers: {Authorization: token }})
    .then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject, { headers: {Authorization: token }})
    .then(response => response.data)
}

export default { getAll, create, update, setToken }