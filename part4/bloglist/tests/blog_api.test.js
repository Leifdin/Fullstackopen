const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)
const _ = require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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
  test('we can add a blog', async () => {
    const blog = {
      author: 'tester',
      title: 'test title',
      url: 'test url',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(helper.initialBlogs.length + 1, response.body.length)
    const blogTitles = response.body.map(blog => blog.title)
    assert(blogTitles.includes(blog.title))
  })

  test('blog without likes will default to 0', async () => {
    const blog = {
      author: 'testLikesTitle',
      title: 'testLikesTitle',
      url: 'testLikesUrl',

    }
    const apiResponse = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const addedBlog = await api.get(`/api/blogs/${apiResponse.body.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(addedBlog.body.likes, 0)
  })
  test('blog without author will result in error 400', async () => {
    const blog = {
      author: 'test',
      url: 'test',

    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const blogs = await api.get(`/api/blogs/`)
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
  })
  test('blog without title will result in error 400', async () => {
    const blog = {
      author: 'test',
      url: 'test',

    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const blogs = await api.get(`/api/blogs/`)
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
  })
})

describe('delete requests', () => {
  test('we can delete notes', async () => {
    const blogs = await helper.getBlogs()
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(204)
    const blogsAfterDel = await helper.getBlogs()

  const titles = blogsAfterDel.map(r => r.title)
  assert(!titles.includes(blogs[0].title))

  assert.strictEqual(blogsAfterDel.length, helper.initialBlogs.length - 1)
  })
})

describe('update requests', () => {
  test('we can update notes', async () => {
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