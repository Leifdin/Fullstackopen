import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({text, data}) =>{
  return (
    <tr>
      <td>{text}:</td>
      <td>{data}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total > 0) {
    return(
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" data={good} />
            <StatisticLine text="Neutral" data={neutral} />
            <StatisticLine text="Bad" data={bad} />
            <StatisticLine text="Total" data={total} />
            <StatisticLine text="Average" data={((good * 1) + (bad * -1)) / total} />
            <StatisticLine text="Positive" data={[good / total * 100, ' %']} />
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" data={good} />
          <StatisticLine text="Neutral" data={neutral} />
          <StatisticLine text="Bad" data={bad} />
        </tbody>
      </table>
      <p>No feedback given</p>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
