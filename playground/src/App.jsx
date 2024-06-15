import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Hello = ({name, age}) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p> Hello {name}, you are {age}</p>
      <p> so you were probably bown in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Pavol'
  const age = 30
  
  return(
    <div>
      <h1>Greetings</h1>
      <Hello name="Veronika" age={19 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App
