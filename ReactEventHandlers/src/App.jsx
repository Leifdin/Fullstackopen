import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
      <button onClick={() => setToValue('World')}>
        World
      </button>
      <button onClick={() => setToValue(1000)}>
        1000
      </button>
      <button onClick={() => setToValue(0)}>
        Reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        Plus
      </button>
    </div>
  )
}

export default App
