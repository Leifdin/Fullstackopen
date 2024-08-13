const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('password is required as argument')
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://pavolpolonec:${password}@cluster0.dyptt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

/*
const note = new Note({
    content: 'Linux > Windows',
    important: false,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})
*/

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})