import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Stats = ({good, neutral, bad}) => {
  return(
    <div>
      <h1>Statistics</h1>
      <p>Good: {good} Neutral: {neutral} Bad: {bad}</p>
    </div>
    
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Unicafe feedback</h1>
      <Button text="Good" handleClick={()=>setGood(good + 1)} />
      <Button text="Neutral" handleClick={()=>setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={()=>setBad(bad + 1)} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
