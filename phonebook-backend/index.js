const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const Person = require('./models/person')

const app = express()

// Morgan token to log request body
morgan.token('body', (request) => JSON.stringify(request.body))

app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(express.static('dist'))

// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// GET info
app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `)
  })
})

// POST a new person
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number is missing' })
  }

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// DELETE a person by ID
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log('DELETE request received for id:', id)

  if (!id) {
    return response.status(400).json({ error: 'id missing' })
  }

  Person.findByIdAndDelete(id)
    .then(result => {
      console.log('Result of deletion:', result)
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => {
      console.error('Error during deletion:', error)
      next(error)
    })
})

// Serve frontend for non-API routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  } else {
    next()
  }
})

// Error handling middleware
app.use((error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})