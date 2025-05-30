const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const defaultBlog = require('../models/defaultBlog')
const _  = require('lodash')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {

  const user = await User.findById(request.user.id)
  console.log(user)


  const body = request.body
  if (!body.author) {
    return response.status(400).json({
      error: 'Author missing'
    })
  }
  if (!body.title) {
    return response.status(400).json({
      error: 'Title missing'
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'URL missing'
    })
  }
  const blog = new Blog({ ...defaultBlog, ...body, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedBlog = await Blog.populate(savedBlog, {path: 'user'})
  response.status(201).json(populatedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'invalid token' })
  // }
  const user = await User.findById(request.user.id)
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(400).json({error: 'blog not found'})
  }
  if (request.user.id !== blog.user.toString()) {
    return response.status(401).json({ error: 'user can only delete their own blogs' })
  }
  await Blog.findByIdAndDelete(blog._id)
  user.blogs = user.blogs.filter(blogID => !_.isEqual(blogID, blog._id))
  user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})

module.exports = blogsRouter