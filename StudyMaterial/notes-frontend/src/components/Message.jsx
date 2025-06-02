import { useEffect, useRef } from "react"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import { initMessage } from "../App"

const Message = ({ message, setMessage }) => {
  const infoStyle = { background: '#99ff99', border: '3px solid #008000' }
  const errorStyle = { background: '#FAA0A0', border: '3px solid #AA0909' }
  const hideMessage = useRef()

  const textStyle = {
    color: message.type === 'info' ? '#008000' : '#AA0909',
    margin: '5px'
  }

  useEffect(() => {
    hideMessage.current = new Date(Date.now() + message.timeout)
  }, [message])

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() >= hideMessage.current) {
        setMessage(initMessage)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (<>{message.isShown &&
    <Row style={{ margin: "0 5px 10px 5px", position: 'fixed', top: '15px', zIndex: '2' }}>
      <Col
        xs={12}
        style={message.type === 'info' ? infoStyle : errorStyle}>
        <p style={textStyle}>{message.msg}</p>
      </Col>
    </Row>
  }</>)
}

export default Message