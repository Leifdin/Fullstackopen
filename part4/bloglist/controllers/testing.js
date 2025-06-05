const router = require('express').Router()
const logger = require('../utils/logger')
const Note = require('../models/blog')
const Blog = require('../models/user')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await Blog.deleteMany({})
  logger.info('db reset for testing')

  response.status(204).end()
})

module.exports = router