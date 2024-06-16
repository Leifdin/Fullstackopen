import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const Hello = (props) => {
  console.log(props)
    return (
      <div>
        <p>Hello, my name is {props.name} and I am {props.age}</p>
      </div>
    )
  }

function App() {
  const [count, setCount] = useState(1)
  console.log("Bonjour!")



  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://polonec.eu" target="_blank">
          <img src="https://polonec.eu/p/wp-content/uploads/2020/03/cropped-logo-2-e1583225616808.png" className="logo" alt="Logo ZŠ Spojová" />
        </a>
      </div>
      <h1>Vite + React + Polonec</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count / 2)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Hello name="Grzegorz" age={35}/>
      <Hello name="Brzeczysczykiewicz" age={45}/>
      <Hello name="Grzymychuj" age={15}/>
    </>
  )
}

export default App
