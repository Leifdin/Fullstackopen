import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, deletePerson}) => {
  return (
  <li>
    {person.id} Name: {person.name} Number: {person.number}
    <button onClick={deletePerson}>Delete</button>
  </li>
  )
}

const Phonebook = ({numbers, handleDelete}) => {
  
  return (
    <div>
      {numbers.map(person => 
        <Person 
        key={person.id} 
        person={person}
        deletePerson={() => handleDelete(person.id)}
        />)}
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
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
    /*axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
    */
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
     personService
     .create(personObject)
     .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
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
  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    console.log(`Person with name ${personToDelete.name} and ${personToDelete.id} will be deleted`)
    if (window.confirm(`Delete ${personToDelete.name} from phonebook?`)) {
      personService
      .remove(personToDelete.id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== returnedPerson.id))
        console.log(`Person ${returnedPerson.id} ${returnedPerson.name} deleted`)
      })
    }
    
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
      <Phonebook numbers={filterPersons} handleDelete={handleDeletePerson} />
      <div>debug: {newName} number:{newNumber}</div>
    </div>
  )
}

export default App
