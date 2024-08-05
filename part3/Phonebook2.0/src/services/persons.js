import axios from 'axios'
const baseURL = 'http://164.90.186.10:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const remove = personId => {
    const request = axios.delete(`${baseURL}/${personId}`)
    return request.then(response => response.data)
}

const update = (personID, newObject) => {
    const request = axios.put(`${baseURL}/${personID}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }