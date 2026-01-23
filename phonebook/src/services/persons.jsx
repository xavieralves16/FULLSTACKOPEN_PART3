import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => axios.get(baseUrl)

const create = newPerson => axios.post(baseUrl, newPerson)

const update = (id, updatedPerson) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson)

const remove = id => axios.delete(`${baseUrl}/${id}`)

export default {
  getAll,
  create,
  update,
  remove
}


