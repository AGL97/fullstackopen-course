import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

//Inicializacion del servidor
const app = express()

//Definicion de Middelwares
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('-------------------')
//   next()
// }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('payload', (req,res) => JSON.stringify(req.body))

//Inyeccion de middlewares
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.payload(req, res)
  ].join(' ')
}))
// app.use(requestLogger)

//Configuracion del servidor
const PORT = process.env.PORT || 3001
const BASE_URL = `http://localhost:${PORT}`
const API_URL = `${BASE_URL}/api`
const GROUP_ROUTES = {
  persons: 'persons',
  info: 'info'
}

//?Endpoints
//Devuelve todos los recursos de personas
app.get(`/api/${GROUP_ROUTES.persons}`, (request, response) => {
  response.status(200).contentType('application/json').json(makeBodyResponse(
    {
        message: 'Persons retrieved successfully',
        url: request.url,
        data: persons
    }
  ))
})

//Devuelve informacion de la cantidad de personas y la hora en la que se ejecuto la solicitud
app.get(`/api/${GROUP_ROUTES.info}`, (request, response) => {
    const date = new Date()
    const personsCount = persons.length
    const html = `
        <p>Phonebook has info for ${personsCount} people.</p>
        <p>The current time is ${date}</p>
    `
    response.status(200).contentType('html').send(makeBodyResponse({isHtml: true, html}))
})

//Obtiene una persona especifica
app.get(`/api/${GROUP_ROUTES.persons}/:id`, (request, response) => {
  const id = parseInt(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
        return response.status(200).contentType('application/json').json(makeBodyResponse(
        {
            url:request.url ,
            data: person 
        }
    ))
  } 

  response.status(404).contentType('application/json').json(makeBodyResponse(
    {
        isError: true,
        error: 'Person not found',
        url: request.url
    }
  ))
})

//Crea una persona especifica
app.post(`/api/${GROUP_ROUTES.persons}`, (request, response) => {
  const {name, number} = request.body

  if(!name || !number){
    return response.status(400).contentType('application/json').json(makeBodyResponse(
      {
          isError:true,
          error: 'Missing name or number',
          url: request.url
      }
    ))
  }

  const isDuplicatedField = isDuplicated({name,number},persons)

  if(typeof isDuplicatedField === 'string'){
    return response.status(400).contentType('application/json').json(makeBodyResponse(
      {
          isError:true,
          error: isDuplicatedField,
          url: request.url,
      }
    ))
  }

  const newPerson = {
    id: getNewId(persons),
    name: name,
    number: number
  }

  persons.push(newPerson)

  response.status(200).contentType('application/json').json(makeBodyResponse(
    {
        url: request.url,
        data: newPerson
    }
  ))
})

//Actualiza una persona especifica
app.put(`/api/${GROUP_ROUTES.persons}/:id`, (request, response) => {
  const {id} = request.params
  const {name,number} = request.body


  if(!id){
    return response.status(400).contentType('application/json').json(makeBodyResponse(
      {
          isError:true,
          error: 'Not found!!!',
          url: request.url
      }
    ))
  }  

  if(!name || !number){
    return response.status(400).contentType('application/json').json(makeBodyResponse(
      {
          isError:true,
          error: 'Missing number or name!!!',
          url: request.url
      }
    ))
  }  

  const personToUpdate = persons.find(person => person.id === parseInt(id))
  
  if(!personToUpdate){
    return response.status(400).contentType('application/json').json(makeBodyResponse(
      {
          isError:true,
          error: 'Not found!!!',
          url: request.url
      }
    ))
  } 

  const updatedPerson = {
    ...personToUpdate,
    name,
    number
  }

  persons.filter(person => person.id !== parseInt(id)).push(updatedPerson)

  persons.sort((a,b) => a > b)

  response.status(200).contentType('application/json').json(makeBodyResponse(
    {
        url: request.url,
        data: updatedPerson
    }
  ))
})




//Elimina una persona especifica
app.delete(`/api/${GROUP_ROUTES.persons}/:id`, (request, response) => {
  const id = parseInt(request.params.id)
  const personsCount = persons.length
  const newPersons = persons.filter(person => person.id !== id)
  const newPersonsCount = newPersons.length

  if(personsCount === newPersonsCount){
    return response.status(404).contentType('application/json').json(makeBodyResponse(
      {
          error: 'Person not found',
          url: request.url
      }
    ))
  }  

  persons = newPersons

  response.status(200).contentType('application/json').json(makeBodyResponse(
    {
        url: request.url,
        data: newPersons
    }
  ))
})


app.use(unknownEndpoint)

//*Levantamiento del servidor
app.listen(PORT,() => {
  console.log(`Server initialized on port ${PORT}`)
  console.log(`Routes available:`)
  console.log(`GET ${API_URL}/${GROUP_ROUTES.persons}`)
  console.log(`GET ${API_URL}/${GROUP_ROUTES.info}`)
  console.log(`GET ${API_URL}/${GROUP_ROUTES.persons}/:id`)
  console.log(`POST ${API_URL}/${GROUP_ROUTES.persons}`)
  console.log(`DELETE ${API_URL}/${GROUP_ROUTES.persons}/:id`)
})




//*Helpers
const getNewId = (table) => {
  return Math.max(...table.map(n => n.id)) + 1
}

const makeBodyResponse = ({message='ok',url = '',data, isError = false, error = '',html = '<></>', isHtml = false}) => {
    if(isError){
        return {
            error,
            url,
        }
    }

    if(isHtml){
        return html
    }

    return {
        message,
        url,
        data,
    }
}

const isDuplicated = (fields,table) => {  
  const {name, number} = fields
  const isNameDuplicated = table.some(f => f.name.toLowerCase() === name.trim().toLowerCase())
  const isNumberDuplicated = table.some(f => f.number.toLowerCase() === number.trim().toLowerCase())

  if(isNameDuplicated && isNumberDuplicated){
    return 'Name and Number already exists'
  }

  if(isNameDuplicated){
    return 'Name already exists'
  }

  if(isNumberDuplicated){
    return 'Number already exists'
  }

  return false;   
} 

//! Base de datos
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]