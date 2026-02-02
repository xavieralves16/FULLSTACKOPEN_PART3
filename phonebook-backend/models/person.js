const mongoose = require('mongoose')

const url =
  `mongodb+srv://xavier:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.lbwwkqb.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Person name is required'],
    minlength: [3, 'Person name must be at least 3 characters long']
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)