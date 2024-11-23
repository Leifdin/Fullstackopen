import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Note = (props) => {
  const label = props.note.important
    ? 'make not important' : 'make important'
  return (
    <div style={{ padding: '0 15px' }}>
      <Card style={{ display: 'flex', height: '100%', textAlign: 'center'}}>
        <Card.Body>
          <Card.Title>{props.index + 1}</Card.Title>
          <Card.Text>
            {props.note.content}
          </Card.Text>

          </Card.Body>
          <Card.Footer>
            <Button
              variant={props.note.important ? "outline-secondary" : "outline-primary"}
              onClick={props.toggleImportance}
              id="button-addon1">
              {label}
            </Button>
          </Card.Footer>
      </Card>
    </div>
  )

}

export default Note
