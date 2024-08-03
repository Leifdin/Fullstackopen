import { useEffect, useState } from 'react'
import SearchField from './components/SearchField.jsx'
import CountriesList from './components/CountriesList.jsx'
import countriesService from './services/countries.js'

function App() {
  const [searchFieldContent, setSeachFieldContent] = useState('')
  const [countriesData, setCountriesData] = useState([])
  

  useEffect(() => {
    countriesService
    .getAll()
    .then(countries => setCountriesData(countries))
  }, [])
  
  const handleSearchField = (event) => {
    setSeachFieldContent(event.target.value)
  }
  
  return (
    <div>
      <SearchField text={searchFieldContent} handleSearchField={handleSearchField} />
      <CountriesList data={countriesData} searchFilter={searchFieldContent} weatherApiKey={apiKey}/>
    </div>
  )
}
export default App
