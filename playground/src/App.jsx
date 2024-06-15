import { useState } from 'react'
import './App.css'

const Display = ({text, counter}) => <div className="display">{text}{counter}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>


const App = () => {

  const [pali, setPali] = useState(0)
  const [nika, setNika] = useState(0)
  const [allClicks, setAllClicks] = useState([])

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
  const setToZero = () => {
    console.log('Counter state before zeroing: ', pali, nika)
    setPali(0)
    setNika(0)
    setAllClicks([])
  }

  return (
    <div>
      <Display text='Pali: ' counter={pali} />
      <Display text='Nika: ' counter={nika} />
      <p>All clicks: {allClicks.join(' ')}</p>
      <Button onClick={handlePali}
      text='Pali'
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