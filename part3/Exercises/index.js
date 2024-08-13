const express = require('express')
const morgan = require('morgan')
const cors = require ('cors')
const Person = require('./models/person.js')
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
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
      response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}`)
      })
    })
    

app.get('/api/persons/:id', (request, response) => {
  console.log(request.params.id)
  Person.findById(request.params.id)
  .then(person => {
    if(person){
      response.json(person)
    }
    else{
      response.status(404).send({ error: '404: That person does not exist' })
    }
    
  })
  .catch(error => {
    console.log(error)
    response.status(500).end()
  })
})
/*
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  personToDelete = persons.find(person => person.id === id)
  if (personToDelete){
    persons = persons.filter(person => person.id !== id)
    return response.status(200).json(personToDelete)
  }
  response.status(204).end()
})
  */
app.delete('/api/persons/:id', (request, response) => {
  let personToDelete
  Person.findById(request.params.id)
  .then(person => {
    if(person){
      personToDelete = person
    }
    else{
      response.status(404).send({ error: '404: That person does not exist' })
    }
  })
  Person.deleteOne({ _id: request.params.id} )
  .then(person => {
    console.log(`Deleted ${person.deletedCount} entries`)
    response.json(personToDelete)
  })
  .catch(error => {
    console.log(error)
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number missing'
    })
  }
  /*
  if (persons.find (person => person.name === body.name)) {
    return response.status(400).json({
      error: `${body.name} already exists in the phonebook`
    })
  }
  */
  const person = new Person({
    name: body.name,
    number: body.number
  })
  //console.log(person)
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)