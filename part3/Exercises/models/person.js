const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(result => {
    console.log(`Connection successful`)
})
.catch (error => {
    console.log(`Connection error: ${error.message}`)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = new mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)