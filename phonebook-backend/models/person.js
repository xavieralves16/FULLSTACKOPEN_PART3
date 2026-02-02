const mongoose = require('mongoose')

const url =
  `mongodb+srv://xavier:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.lbwwkqb.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

module.exports = mongoose.model('Person', personSchema)