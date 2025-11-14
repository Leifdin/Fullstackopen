import axios from 'axios'
const env = process.env.NODE_ENV
const baseUrl = env === 'dev' ? 'http://localhost:3000/api/login' : '/api/login'

const login = (credentials) => axios.post(baseUrl, credentials).then(response => response.data)

export default { login }
