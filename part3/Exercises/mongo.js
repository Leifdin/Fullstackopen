const mongoose = require('mongoose')

if (process.argv.length < 5 && !process.argv.length===3) {
  console.log('Usage: node mongo.js password name number to add number, node mongo.js password to list numbers')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://pavolpolonec:${password}@cluster0.dyptt.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)

mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person', personSchema)

if(process.argv.length > 3) {


  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log(`added ${person.name} with number ${person.number}`)
    mongoose.connection.close()
  })
}
if (process.argv.length === 3){
  Person.find().then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })

}



