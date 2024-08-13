const express = require('express')
const morgan = require('morgan')
const cors = require ('cors')
const person = require('./models/person.js')
//const note = require('../StudyMaterial/models/note')
const app = express()

morgan.token('id', (req, res) => {
  return req.id
})
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :id :response-time :body'))
app.use(cors())
app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
    person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    //response.json(person)
    response.send(`
      <h1>${person.name}</h1>
      <p>Number: ${person.number}</p>
      `)
  } else {
    response.status(404).send('404: That person does not exist')
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  personToDelete = persons.find(person => person.id === id)
  if (personToDelete){
    persons = persons.filter(person => person.id !== id)
    return response.status(200).json(personToDelete)
  }
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number missing'
    })
  }
  if (persons.find (person => person.name === body.name)) {
    return response.status(400).json({
      error: `${body.name} already exists in the phonebook`
    })
  }

  const person = {
    id: String(Math.ceil(Math.random()*100000)),
    name: body.name,
    number: body.number
  }
  //console.log(person)
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)