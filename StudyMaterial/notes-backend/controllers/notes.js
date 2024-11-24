const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

require('express-async-errors')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}



notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})


notesRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const note = await Note.findById(request.params.id).populate('user', { username: 1, name: 1 })

  if (user.id !== note.user?.toString()) {
    return response.status(401).json({ error: 'user can only update their own notes' })
  }
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.post('/', async (request, response) => {

  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({ error: 'invalid token' })
  }


  const user = await User.findById(decodedToken.id)
  if (!body.content) {
    return response.status(400).json({
      error: 'Content missing'
    })
  }
  const note = new Note({
    content: body.content,
    important: body.important ?? false,
    user: user.id,
  })
  console.log(note)
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)

})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  if (!body.content) {
    return response.status(400).json({
      error: 'Content missing'
    })
  }

  const note = await Note.findById(request.params.id)

  if (user.id !== note.user?.toString()) {
    return response.status(401).json({ error: 'user can only update their own notes' })
  }
  submitNote = {
    content: body.content,
    important: body.important,
  }
  

  const updatedNote = await Note
    .findByIdAndUpdate(request.params.id, submitNote, { new: true })
    .populate('user', { username: 1, name: 1 })
  response.json(updatedNote)
})

module.exports = notesRouter