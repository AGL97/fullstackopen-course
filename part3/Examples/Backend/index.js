
import express from 'express'

const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScripts",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const PORT = 3001
const BASE_URL = `http://localhost:${PORT}/api`
const GROUP_ROUTES = {
  notes: 'notes'
}

app.use(express.json())

//Ruta principal
app.get('/api/', (request, response) => {
  response.status(200).contentType('html').send('<h1>Hello World!</h1>')
})

//Obtiene todos los recursos de notas
app.get(`/api/${GROUP_ROUTES.notes}`, (request, response) => {
  response.status(200).contentType('application/json').json({notes,url: request.baseUrl})
})

//Obtiene una nota especifica
app.get(`/api/${GROUP_ROUTES.notes}/:id`, (request, response) => {
  const id = parseInt(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.status(200).contentType('application/json').json({note,url: request.baseUrl})
  } else {
    response.status(404).contentType('application/json').json({error: 'Note not found',url: request.baseUrl})
  }
})

//Elimina una nota especifica
// app.delete(`/api${GROUP_ROUTES.notes}/:id`, (request, response) => {
//   const id = parseInt(request.params.id)
//   const newNotes = notes.filter(note => note.id !== id)
//   response.status(200).contentType('application/json').json({message: 'Note deleted successfully', notes:newNotes })  
// })

app.delete(`/api/${GROUP_ROUTES.notes}/:id`, (request, response) => {
  const id = parseInt(request.params.id)
  const newNotes = notes.filter(note => note.id !== id)
  response.status(204).end() 
})

app.post(`/api/${GROUP_ROUTES.notes}`, (request, response) => {  
  const { content, important  } = request.body

  if(!content){
    return response.status(400).contentType('application/json').json({error: 'Content is required',url: request.baseUrl})
  }

  if(content.length <= 5){
    return response.status(400).contentType('application/json').json({error: 'Content must be greater than 5 characters',url: request.baseUrl})
  }

  const newNote = {
    id: getNewId(),
    content,
    important: Boolean(body.important) || false
  }

  notes.push(newNote)

  response.status(200).contentType('application/json').json({message: 'Note created successfully', note: notes,url: request.baseUrl })
})

app.listen(PORT,() => {
  console.log(`Server initialized on port ${PORT}`)
  console.log(`Routes available:`)
  console.log(`GET ${BASE_URL}`)
  console.log(`GET ${BASE_URL}/${GROUP_ROUTES}`)
  console.log(`GET ${BASE_URL}/${GROUP_ROUTES}/:id`)
  console.log(`POST ${BASE_URL}/${GROUP_ROUTES}`)
  console.log(`DELETE ${BASE_URL}/${GROUP_ROUTES}/:id`)
})

const getNewId = () => {
  return Math.max(...notes.map(n => n.id)) + 1
}