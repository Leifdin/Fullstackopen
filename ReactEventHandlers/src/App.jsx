import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Display = (props) => {
  return (
    <div>

    </div>
  )
}

function App() {
  const [value, setValue] = useState(10)

  const hello = (who) => () => {
    console.log('Hello, ', who, '!')
  }

  const setToValue = (newValue) => {
    console.log('Value now: ', value)
    setValue(newValue)
  }

  

  return (
    <div>
      {value}
      <Button text='World' handleClick={() => setToValue('World')} />
      <Button text='1000' handleClick={() => setToValue(1000)} />
      <Button text='Reset' handleClick={() => setToValue(0)} />
      <Button text='Plus' handleClick={() => setToValue(value + 1)} />
    </div>
  )
}

export default App
