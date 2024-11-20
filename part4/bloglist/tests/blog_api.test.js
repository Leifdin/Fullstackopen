const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)
const _ = require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const initialUser = await api.post('/api/users').send({ username: 'thelper', name: 'Tester Helper', password: 'tajne' })
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog({ ...blog, user: initialUser.body.id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('User test', () => {
  test('Users are returned as json', async () => {
    await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
  })

  test('User can log in', async () => {
    await api.post('/api/login').send({ username: 'thelper', password: 'tajne' }).expect(200)

  })
})

describe('Basic tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('api returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('each blog has id key', async () => {
    const blogs = await helper.getBlogs()
    for (let blog of blogs) {
      assert(blog.hasOwnProperty('id'))
    }
  })
})

describe('post requests', () => {


  test('post without token results in 401', async () => {

    const user = await User.findOne({username: 'thelper'})
    const blog = {
      author: 'tester',
      title: 'test title',
      url: 'test url',
      likes: 1,
      user: user.id
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(helper.initialBlogs.length, response.body.length)
    const blogTitles = response.body.map(blog => blog.title)
    assert(!blogTitles.includes(blog.title))
  })
  test('we can add a blog', async () => {
    const loginResponse = await api.post('/api/login').send({ username: 'thelper', password: 'tajne' })
    const userToken = loginResponse.body.token
    const user = await User.findOne({username: 'thelper'})
    const blog = {
      author: 'tester',
      title: 'test title',
      url: 'test url',
      likes: 1,
      user: user.id
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(helper.initialBlogs.length + 1, response.body.length)
    const blogTitles = response.body.map(blog => blog.title)
    assert(blogTitles.includes(blog.title))
  })

  test('blog without likes will default to 0', async () => {
    const loginResponse = await api.post('/api/login').send({ username: 'thelper', password: 'tajne' })
    const userToken = loginResponse.body.token
    const user = await User.findOne({username: 'thelper'})
    const blog = {
      author: 'tester',
      title: 'test title',
      url: 'test url',
      user: user.id
    }
    const apiResponse = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .set('Authorization', `Bearer ${userToken}`)
      .expect('Content-Type', /application\/json/)
    const addedBlog = await api.get(`/api/blogs/${apiResponse.body.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(addedBlog.body.likes, 0)
  })

  test('blog without author will result in error 400', async () => {
    const loginResponse = await api.post('/api/login').send({ username: 'thelper', password: 'tajne' })
    const userToken = loginResponse.body.token
    const user = await User.findOne({username: 'thelper'})
    const blog = {
      title: 'test',
      url: 'test url',
      user: user.id
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(400)

    const blogs = await api.get(`/api/blogs/`)
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
  })
  test('blog without title will result in error 400', async () => {
    const loginResponse = await api.post('/api/login').send({ username: 'thelper', password: 'tajne' })
    const userToken = loginResponse.body.token
    const user = await User.findOne({username: 'thelper'})
    const blog = {
      author: 'jano',
      url: 'test url',
      user: user.id
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(400)

    const blogs = await api.get(`/api/blogs/`)
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
  })
})

describe('delete requests', () => {
  test('user can delete their blogs', async () => {
    const loginResponse = await api.post('/api/login').send({ username: 'thelper', password: 'tajne' })
    const userToken = loginResponse.body.token
    const user = await User.findOne({username: 'thelper'})
    const blog = {
      author: 'tester',
      title: 'unique title',
      url: 'test url',
      likes: 1,
      user: user.id
    }
    const blogResponse = await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsBeforeDel = await helper.getBlogs()
    await api
      .delete(`/api/blogs/${blogResponse.body.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(204)
    const blogsAfterDel = await helper.getBlogs()

  const titles = blogsAfterDel.map(r => r.title)
  assert(!titles.includes(blog.title))

  assert.strictEqual(blogsAfterDel.length, blogsBeforeDel.length - 1)
  })

  test('user cannot delete other blogs', async () => {
    await api.post('/api/users').send({ username: 'otherUser', name: 'Other User', password: 'tajne' })
    const loginResponse = await api.post('/api/login').send({ username: 'otherUser', password: 'tajne' })
    const userToken = loginResponse.body.token

    const blogsBeforeDel = await helper.getBlogs()
    
    await api
      .delete(`/api/blogs/${blogsBeforeDel[0].id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(401)
    const blogsAfterDel = await helper.getBlogs()

  const titles = blogsAfterDel.map(r => r.title)
  assert(titles.includes(blogsAfterDel[0].title))

  assert.strictEqual(blogsAfterDel.length, blogsBeforeDel.length)
  })
  test('delete request without token fails', async () => {
    const blogsBeforeDel = await helper.getBlogs()
    
    await api
      .delete(`/api/blogs/${blogsBeforeDel[0].id}`)
      .expect(401)
  })
  test('delete request with incorrect token fails', async () => {
    const blogsBeforeDel = await helper.getBlogs()
    
    await api
      .delete(`/api/blogs/${blogsBeforeDel[0].id}`)
      .set('Authorization', `Bearer invalidToken`)
      .expect(401)
  })
})

describe('update requests', () => {
  test('we can update blogs', async () => {
    const blogs = await helper.getBlogs()
    const dataToSend = {
      ...blogs[0],
      author: 'Janko Mrkvicka'
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(dataToSend)
      .expect(200)
    assert.notDeepEqual(blogs[0], updatedBlog.body)
  })
})



after(async () => {
  await mongoose.connection.close()
})