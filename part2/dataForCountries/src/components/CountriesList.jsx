import countries from "../services/countries"

const Country = ( {countryName}) => {
    return (
        <li>{countryName}</li>
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
    
    if (displayCountries.length <= 10) {
        return (
            <div>
                <ul>
                {displayCountries.map(country => <Country countryName={country.name.common} key={country.cca2} />)}
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