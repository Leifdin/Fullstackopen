import { useState } from 'react'
import './App.css'

const Display = ({text, counter}) => <div className="display">{text}{counter}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const History = (props) => {
  if (props.allClicks.length === 0){
    return (
      <p>The app counts rock - paper - scissors score by clicking on the buttons</p>
    )
  }
  return (
    <p>Game history: {props.allClicks.join(' ')}</p>
  )
}

const App = () => {

  const [pali, setPali] = useState(0)
  const [nika, setNika] = useState(0)
  const [allClicks, setAllClicks] = useState([])
  const [ties, setTies] = useState(0)

  const handlePali = () => {
    console.log('Pali state before increasing: ', pali)
    setAllClicks(allClicks.concat('P'))
    setPali(pali + 1)
  }
  const handleNika = () => {
    console.log('Nika state before decreasing: ', nika)
    setAllClicks(allClicks.concat('N'))
    setNika (nika + 1)
  }
  const handleTies = () => {
    console.log('Ties state before decreasing: ', ties)
    setAllClicks(allClicks.concat('T'))
    setTies (ties + 1)
  }

  const setToZero = () => {
    console.log('Counter state before zeroing: ', pali, nika)
    setPali(0)
    setNika(0)
    setTies(0)
    setAllClicks([])
  }

  return (
    <div>
      <Display text='Pali: ' counter={pali} />
      <Display text='Ties: ' counter={ties} />
      <Display text='Nika: ' counter={nika} />
      <Display text='Total: ' counter={nika + pali + ties} />
      <History allClicks={allClicks} />
      <Button onClick={handlePali}
      text='Pali'
      />
      <Button onClick={handleTies}
      text='Tie'
      />
      <Button onClick={handleNika}
      text='Nika'
      />
      <Button onClick={setToZero}
      text='Zero'
      />
    </div>
  )
}

export default App