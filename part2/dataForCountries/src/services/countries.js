import axios from 'axios'
const baseURL='https://studies.cs.helsinki.fi/restcountries/api/all'
const apiKey=import.meta.env.VITE_OPENWEATHER_API_KEY

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}
const getWeather = (latitude, longitude) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`)
return request.then(response => response.data)
}

export default { getAll, getWeather }