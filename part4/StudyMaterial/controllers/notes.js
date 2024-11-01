const notesRouter = require('express').Router()
const Note = require('../models/note')



notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }

        })
        .catch(error => next(error))
})


notesRouter.delete('/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()

})

notesRouter.post('/', (request, response) => {

    const body = request.body
    if (!body.content) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }
    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    })
    console.log(note)
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter