const express = require('express')
const cors = require('cors')
const app = express()

const Note = require('./models/note')

require('dotenv').config()

app.use(express.static('dist'))



const requestLogger = (request, response, next) => {
    console.log(`Method: ${request.method}`)
    console.log(`Path: ${request.path}`)
    console.log(`Body: ${request.body}`)
    console.log(`---`)
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}


const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: '404: not found'
    })
}


app.use(cors())
app.use(express.json())
app.use(requestLogger)


app.get('/', (request, response) => {
    response.send('<h1>Hello, World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
    .then(note => {
        if (note){
            response.json(note)
        } else {
            response.status(404).end()
        }
        
    })
    .catch(error => next(error))
})


app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
    
})

app.post('/api/notes', (request, response) => {
     
    const body = request.body
    if (!body.content) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }
    const note = new Note ({
        content: body.content,
        important: Boolean(body.important) || false,
    })
    console.log(note)
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)