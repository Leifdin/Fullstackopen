import { useState } from 'react'

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


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  const checkName = () => {
    let canAdd = true
    persons.map((person) => {
      console.log(person.name, newName, person.name === newName)
      if (person.name === newName){
        canAdd = false
      }
    })
    return canAdd
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkName()) {
      const personObject = {name: newName, number: newNumber, id: persons.length + 1}
      /*console.log(checkName())*/
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input value={searchString} onChange={handleSearchFieldChange} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" >Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook numbers={persons} />
      <div>debug: {newName} number:{newNumber}</div>
    </div>
  )
}

export default App
