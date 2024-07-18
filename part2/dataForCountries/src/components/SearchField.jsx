import { useState } from 'react'

const SearchField = ({ text, handleSearchField }) => {
    return (
        <div>
            Search countries: <input value={text} onChange={handleSearchField}></input>
        </div>
    )
}

export default SearchField