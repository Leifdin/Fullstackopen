import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
  return <p>{person.id} Name: {person.name} Number: {person.number}</p>
}

const Phonebook = ({numbers}) => {
  return (
    <div>
      {numbers.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

const SearchField = ({searchField, handleSearchField}) => {
  return (
    <div>
        filter: <input value={searchField} onChange={handleSearchField} />
    </div>
  )

}

const NewPerson = ({submitFunction, newName, handlePersonChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={submitFunction}>
    <div>
      name: <input value={newName} onChange={handlePersonChange} />
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit" >Add</button>
    </div>
  </form>
  )}
  

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      /*
      console.log('Promise fulfilled')
      */
      setPersons(response.data)
    })
  }, [])

  const filterPersons = persons.filter((person) => {
    /*
      console.log(person.name.toLowerCase(), searchString.toLowerCase())
      console.log(person.name.toLowerCase().includes(searchString.toLowerCase()))
      */
      return person.name.toLowerCase().includes(searchString.toLowerCase())
    })
  const canAdd = () => {
    let isInPhonebook = persons.some((person) => {
      console.log(person.name, newName, person.name === newName)
      return (person.name === newName)
    })
    /*persons.map((person) => {
      console.log(person.name, newName, person.name === newName)
      if (person.name === newName){
        canAdd = false
      }
    })
    */

    return !isInPhonebook
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (canAdd()) {
      const personObject = {name: newName, number: newNumber}
      /*console.log(checkName())*/
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
    })
      
    } else{
      console.log(`${newName} already exists in the phonebook`)
      alert(`${newName} already exists in the phonebook`)
    }

  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchFieldChange = (event) => {
    setSearchString(event.target.value)
    console.log(filterPersons)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <SearchField searchField={searchString} handleSearchField={handleSearchFieldChange} />

      {/*<form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" >Add</button>
        </div>
      </form>*/}
      <NewPerson submitFunction={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Phonebook numbers={filterPersons} />
      <div>debug: {newName} number:{newNumber}</div>
    </div>
  )
}

export default App
