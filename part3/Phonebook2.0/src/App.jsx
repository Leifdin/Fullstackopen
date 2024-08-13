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
  

const Message = ({ message, messageType}) => {
  if (message === null) {
    return null
  }
  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

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

  const displayMessage = (messageToDisplay, timeToDisplay) => {
    setMessage(messageToDisplay)
    setMessageType('successMessage')
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, timeToDisplay)
  }
  const displayError = (errorToDisplay, timeToDisplay) => {
    setMessage(errorToDisplay)
    setMessageType('errorMessage')
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, timeToDisplay)
  }
  /*
  useEffect(() => {
    displayError('Hello!', 3000)
  }, [])
  */
  

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
      displayMessage(`${returnedPerson.name} has been successfully added`, 2000)
    })
    .catch(error => {
      console.log(error.message)
      displayError(`Please fill name and number`, 5000)

    })
      
    } else {
      console.log(`${newName} already exists in the phonebook`)
      if (window.confirm(`${newName} already exists in the phonebook, do you want to update number?`)){
        const personToUpdate = persons.find(person => person.name === newName)
        const personObject = {id: personToUpdate.id, name: personToUpdate.name, number: newNumber}
        personService
        .update(personToUpdate.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => {
            return (person.id === returnedPerson.id ? returnedPerson : person)
          }))
          setNewName('')
          setNewNumber('')
          displayMessage(`${returnedPerson.name}'s number has been changed to ${returnedPerson.number}`, 2000)
        })
        .catch(error => {
          displayError(`${personToUpdate.name} is not on the server`, 3000)
        })

      }
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
      .catch(error => {
        console.log('Cannot delete non existent entry')
        displayError(`${personToDelete.name} is not on the server`, 3000)
      })
    }
    
  }

  

  return(
    <div>
      <Message message={message} messageType={messageType} />
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
