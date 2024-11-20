const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const initialUser = await api.post('/api/users').send({ username: 'thelper', name: 'Tester Helper', password: 'tajne' })
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog({ ...blog, user: initialUser.body.id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('User log in test', () => {

  test('User can log in', async () => {
    await api.post('/api/login').send({ username: 'thelper', password: 'tajne' }).expect(200)

  })
  test('User with wrong password cant log in', async () => {
    await api.post('/api/login').send({ username: 'thelper', password: 'nespravne' }).expect(401)
  })
  test('User with wrong username cant log in', async () => {
    await api.post('/api/login').send({ username: 'nespravne', password: 'tajne' }).expect(401)
  })
  test('User without credentials cant log in', async () => {
    await api.post('/api/login').send({ username: 'thelper'}).expect(401)
    await api.post('/api/login').send({ password: 'tajne' }).expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})