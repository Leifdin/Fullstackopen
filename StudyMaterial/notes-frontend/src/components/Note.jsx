import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const Note = (props) => {
  const label = props.note.important
    ? 'make not important' : 'make important'


  const cardStyle = {
    display: 'flex',
    height: '100%',
    textAlign: 'center',
    background: props.disabled ? '#FAFAFA' : '#FAFBFF',
    borderWidth: props.note.important ? '3px' : '1px',
  }

  const textStyle = {
    fontWeight: props.note.important ? 'bold' : 'normal'
  }

  const footerStyle = {
    display: props.disabled ? 'none' : 'inline',
  }
  const buttonStyle = {
    fontWeight: props.note.important ? 'bold' : 'normal',
    borderWidth: props.note.important ? '2px' : '1px',
    display: props.disabled ? 'none' : 'inline',
  }



  return (
    <div style={{ padding: '0 15px', flex: '1 0 auto' }} className='note'>
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>{props.index + 1}</Card.Title>
          <Card.Text style={textStyle}>
            {props.note.content}
          </Card.Text>

        </Card.Body>
        <Card.Footer style={footerStyle}>
          <Button
            variant="outline-secondary"
            style={buttonStyle}
            onClick={props.toggleImportance}
            id="button-addon1"
            disabled={props.disabled}>
            {label}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )

}

export default Note
