const Blog = require('../models/blog')

const initialBlogs = [{
  title: 'first',
  author: 'Polonec',
  url: 'polonec.eu',
  likes: 45,
},
{
  title: 'second',
  author: 'Poloncova',
  url: 'polonec.eu',
  likes: 1000,
},
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'tester',
    url: 'no',
    likes: 0,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, getBlogs
}