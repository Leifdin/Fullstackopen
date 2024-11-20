const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
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

describe('User api test', () => {
  test('Users are returned as json', async () => {
    await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
  })

  test('We can add a user', async () => {

      const user = {
        name: 'Janko Tester',
        username: 'jtester',
        password: 'heslo'
      }
      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/users')
      assert.strictEqual(2, response.body.length)
      const usernames = response.body.map(u => u.username)
      assert(usernames.includes(user.username))
    })
    test('We cannot add a user without password', async () => {
      const user = {
        name: 'Janko Tester',
        username: 'jtester',
      }
      await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/users')
      assert.strictEqual(1, response.body.length)
    })
    test('We cannot add a user with invalid password', async () => {
      const user = {
        name: 'Janko Tester',
        username: 'jtester',
        password: '00'
      }
      await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/users')
      assert.strictEqual(1, response.body.length)
    })
    test('We cannot add a user without username', async () => {
      const user = {
        name: 'Janko Tester',
        password: 'validPass'
      }
      await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/users')
      assert.strictEqual(1, response.body.length)
    })
    test('We cannot add two users with same username', async () => {
      const user = {
        username: 'thelper', 
        name: 'Tester Helper', 
        password: 'tajne'
      }
      await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/users')
      assert.strictEqual(1, response.body.length)
    })
  })
  

after(async () => {
  await mongoose.connection.close()
})