import { useState, useEffect } from "react"
import countriesService from '../services/countries.js'


const WeatherReport = ( {city, latitude, longitude}) => {
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
    countriesService
    .getWeather(latitude, longitude)
    .then(fetchedData => setWeatherData(fetchedData))
    }, [])
    if(weatherData) {
        return(
            <div>
                <h1>Weather in {city}</h1>
                <p>Temperature: {weatherData.main.temp}˚C</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                <p>Wind: {weatherData.wind.speed} km/h</p>
            </div>
        )
    }
}

const CountryReport = ( {displayCountry, showCountryDetails}) => {
    console.log(displayCountry.name.common)
    if (showCountryDetails){
        const countryLanguages = Object
        .values(displayCountry.languages)
        .map(language => <li key={language}>{language}</li>)
        return (
            <div>
                <div>
                    <h1>{displayCountry.name.common}</h1>
                    <p>Capital: {displayCountry.capital[0]}</p>
                    <p>Population: {displayCountry.population}</p>
                    <h2>Languages:</h2>
                    <ul>
                        {countryLanguages}
                    </ul>
                    <img src={displayCountry.flags.svg} alt={displayCountry.flags.alt} width={100} />
                </div>
                <WeatherReport 
                city={displayCountry.capital[0]}
                latitude={displayCountry.latlng[0]}
                longitude={displayCountry.latlng[1]}
                />
            </div>
        )
    }
    return (
        <div>
            <li>{displayCountry.name.common}</li>
        </div>
    )
}

export default CountryReport