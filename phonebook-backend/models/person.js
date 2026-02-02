const mongoose = require('mongoose')

const url =
  `mongodb+srv://xavier:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.lbwwkqb.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneValidator = [
  {
    validator: function(v) {
      if (!v || v.length < 8) return false
      return /^\d{2,3}-\d{5,}$/.test(v)
    },
    message: props => `${props.value} is not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXX`
  }
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Person name is required'],
    minlength: [3, 'Person name must be at least 3 characters long']
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: phoneValidator
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