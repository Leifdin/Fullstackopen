import { useState } from 'react'

const Phonebook = ({numbers}) => {
  return (
    <div>
      {numbers.map(person => <li key={person.name}>{person.name}</li>)}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([{name: 'Pavol Polonec'}, {name: 'Veronika Smrtníková'}])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName}
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit" >Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook numbers={persons} />
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
