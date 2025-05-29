import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000/api/login' : '/api/login'

const login = (credentials) => axios.post(baseUrl, credentials).then(response => response.data)

export default { login }
