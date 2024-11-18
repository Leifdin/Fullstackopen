const notesRouter = require('express').Router()
const Note = require('../models/note')
require('express-async-errors')



notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }

})


notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.post('/', async (request, response) => {

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
  const savedNote = await note.save()
  response.status(201).json(savedNote)

})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote)
})

module.exports = notesRouter