import { useState } from 'react'
import './App.css'

const Display = ({counter}) => <div className="display">{counter}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>


const App = () => {

  const [ counter, setCounter ] = useState(0)
  console.log('Rendering with counter value ', counter)

  const increaseByOne = () => {
    console.log('Counter state before increasing: ', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log('Counter state before decreasing: ', counter)
    setCounter (counter - 1)
  }
  const setToZero = () => {
    console.log('Counter state before zeroing: ', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne}
      text='plus'
      />
      <Button onClick={decreaseByOne}
      text='minus'
      />
      <Button onClick={setToZero}
      text='zero'
      />
    </div>
  )
}

export default App