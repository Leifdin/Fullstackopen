import React from "react"

const LoginForm = ({
  handleChange,
  handleAction,
  username,
  password,
}) => {


  return (
    <div>
      <h2>login</h2>
      <label>
        Username: <input value={username} onChange={e => handleChange(e, 'username')} />
      </label>
      <label>
        Password: <input value={password} onChange={e => handleChange(e, 'password')} type='password' />
      </label>
      <br />
      <button onClick={e => handleAction(e, 'login')}>Submit</button>
    </div>
  )
}
export default LoginForm