const _ = require('lodash')
const logger = require('../utils/logger')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((likes, currBlog) => likes + currBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favBlog, currBlog) => favBlog = favBlog.likes > currBlog.likes ? favBlog : currBlog)
}

const mostBlogs = (blogs) => {
    const blogsBy = _.toPairs(_.countBy(blogs, 'author'))
    //logger.info(blogsBy)
    const author = _.head(_.orderBy(blogsBy, ['1'], ['desc']))

    return _.zipObject(['author:', 'blogs:'], author)
}
const mostLikes = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author')
    const likesBy = _.map(blogsByAuthor, (author, authorName) => {
        const authorLikes = _.reduce(author, (totalLikes, blog) => totalLikes + blog.likes, 0)
        logger.info(authorLikes)
        return {author: authorName, likes: authorLikes}
    })
    //logger.info(_.head(_.orderBy(likesBy, ['likes'], ['desc'])))
    //const author = _.head(_.orderBy(blogsBy, ['1'], ['desc']))

    return _.head(_.orderBy(likesBy, ['likes'], ['desc']))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}