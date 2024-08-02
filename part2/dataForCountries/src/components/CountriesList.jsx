import { useEffect, useState } from "react"
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

const Country = ( {displayCountry, showCountryDetails}) => {
    const [showDetails, setShowDetails] = useState(showCountryDetails)
    if (showDetails) {
        const countryLanguages = Object
        .values(displayCountry.languages)
        .map(language => <li key={language}>{language}</li>)
        const buttonText = showDetails? "Show details" : "Hide details"
        console.log(buttonText)
        return (
            <div>
                <div>
                    <h1>{displayCountry.name.common}</h1>
                    <p>Capital: {displayCountry.capital[0]}</p>
                    <p>Population: {displayCountry.area}</p>
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
                
                <button onClick={()=> setShowDetails(0)}>Hide</button>
            </div>
        )
    }
    return (
        <div>
            <li>{displayCountry.name.common}</li>
            <button onClick={()=> setShowDetails(1)}>Show</button>
        </div>
    )
}
const CountriesList = ( {data, searchFilter}) => {
    const displayCountries = data.filter(country => 
        country.name.common
        .toLowerCase()
        .includes(searchFilter
            .toLowerCase()
        ) )

    
    if (displayCountries.length === 0) {
        return (
            <div>
                Please specify country name to show
            </div>
        )
    }

    if (displayCountries.length === 1) {
        return (
            <Country displayCountry={displayCountries[0]} showCountryDetails="0" />
        )
    }
    
    if (displayCountries.length <= 10) {
        return (
            <div>
                <ul>
                {displayCountries.map(country => <Country displayCountry={country} key={country.cca2} />)}
                </ul>
                
            </div>
        )
    }
    return (
        <div>
            Too many matches, please be more specific
        </div>
    )
    
}

export default CountriesList