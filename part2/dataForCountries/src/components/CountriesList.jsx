import { useEffect, useState } from "react"
import countriesService from '../services/countries.js'
import CountryReport from './CountryReport'


const Country = ( {displayCountry, showCountryDetails}) => {
    const [showDetails, setShowDetails] = useState(showCountryDetails)
    const [renderCount, setRenderCount] = useState(0)
    const buttonText = showDetails? "Hide details" : "Show details"
    /*setRenderCount(renderCount + 1)
    console.log(renderCount)
    */
    return (
        <div>
            <CountryReport 
            displayCountry={displayCountry}
            showCountryDetails={showDetails}
            />
            <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
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
            <Country displayCountry={displayCountries[0]} showCountryDetails="false" />
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