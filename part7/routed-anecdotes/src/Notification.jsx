import React from "react";

const Notification = ({ notification }) => {
  if (!notification) return
  return <div style={{
    position: 'fixed',
    display: 'flex',
    top: '0px',
    background: 'green',
    height: '50px',
    width: '100%',
    opacity: '0.85',
    alignItems: 'center',
    justifyContent: 'center'
  }}
  >{notification}
  </div>
}

export default Notification