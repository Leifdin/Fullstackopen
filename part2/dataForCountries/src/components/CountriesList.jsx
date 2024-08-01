import countries from "../services/countries"

const Country = ( {displayCountry, format}) => {
    if (format === "long") {
        const countryLanguages = Object
        .values(displayCountry.languages)
        .map(language => <li key={language}>{language}</li>)
        console.log(countryLanguages)
        return (
            <div>
                <h1>{displayCountry.name.common}</h1>
                <p>Capital: {displayCountry.capital[0]}</p>
                <p>Population: {displayCountry.area}</p>
                <h2>Languages:</h2>
                <ul>
                    {countryLanguages}
                </ul>
            </div>
        )
    }
    return (
        <li>{displayCountry.name.common}</li>
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
            <Country displayCountry={displayCountries[0]} format="long" />
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