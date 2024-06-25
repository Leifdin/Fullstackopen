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

  const checkName = () => {
    persons.map((person) => {
      if (person.name === newName){
        return true
      }
    })
    return false
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkName()) {
      const personObject = {name: newName}
      console.log(checkName())
      setPersons(persons.concat(personObject))
      setNewName('')
    } else{
      console.log(`${newName} already exists in the phonebook`)
      alert(`${newName} already exists in the phonebook`)
    }

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
