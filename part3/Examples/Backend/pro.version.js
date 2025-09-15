import express from 'express'

const app = express()
app.use(express.json())

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScripts", important: false },
  { id: 3, content: "GET and POST are the most important methods of HTTP protocol", important: true }
]

// Middlewares personalizados
const setContentType = (type) => (req, res, next) => {
  res.set('Content-Type', type)
  next()
}

const validateNoteData = (req, res, next) => {
  const { content } = req.body
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content is required and must be a string' })
  }
  next()
}

const findNoteById = (req, res, next) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  
  const note = notes.find(n => n.id === id)
  if (!note) {
    return res.status(404).json({ error: 'Note not found' })
  }
  
  req.note = note
  req.noteId = id
  next()
}

// Sistema de rutas agrupado por recursos
const routeGroups = {
  // Grupo raíz (sin prefijo)
  root: {
    basePath: '',
    routes: [
      {
        path: '/',
        method: 'get',
        middlewares: [setContentType('text/html')],
        handler: (req, res) => {
          res.status(200).send(`
            <h1>Notes API - Hello World!</h1>
            <h2>Available endpoints:</h2>
            <ul>
              <li>GET /api/notes - Get all notes</li>
              <li>POST /api/notes - Create a new note</li>
              <li>GET /api/notes/:id - Get a specific note</li>
              <li>PUT /api/notes/:id - Update a note</li>
              <li>DELETE /api/notes/:id - Delete a note</li>
            </ul>
          `)
        }
      }
    ]
  },

  // Grupo de notas
  notes: {
    basePath: '/api/notes',
    routes: [
      {
        path: '', // GET /api/notes
        method: 'get',
        middlewares: [setContentType('application/json')],
        handler: (req, res) => {
          // Filtros opcionales por query params
          const { important, search } = req.query
          let filteredNotes = [...notes]
          
          if (important !== undefined) {
            const isImportant = important === 'true'
            filteredNotes = filteredNotes.filter(note => note.important === isImportant)
          }
          
          if (search) {
            filteredNotes = filteredNotes.filter(note => 
              note.content.toLowerCase().includes(search.toLowerCase())
            )
          }
          
          res.status(200).json({
            data: filteredNotes,
            total: filteredNotes.length,
            filters: { important, search },
            message: 'Notes retrieved successfully'
          })
        }
      },
      {
        path: '', // POST /api/notes
        method: 'post',
        middlewares: [setContentType('application/json'), validateNoteData],
        handler: (req, res) => {
          const { content, important = false } = req.body
          
          const newNote = {
            id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
            content: content.trim(),
            important: Boolean(important),
            createdAt: new Date().toISOString()
          }
          
          notes.push(newNote)
          res.status(201).json({
            data: newNote,
            message: 'Note created successfully'
          })
        }
      },
      {
        path: '/:id', // GET /api/notes/:id
        method: 'get',
        middlewares: [setContentType('application/json'), findNoteById],
        handler: (req, res) => {
          res.status(200).json({
            data: req.note,
            message: 'Note retrieved successfully'
          })
        }
      },
      {
        path: '/:id', // PUT /api/notes/:id
        method: 'put',
        middlewares: [setContentType('application/json'), findNoteById, validateNoteData],
        handler: (req, res) => {
          const { content, important } = req.body
          const noteIndex = notes.findIndex(n => n.id === req.noteId)
          
          notes[noteIndex] = {
            ...notes[noteIndex],
            content: content.trim(),
            important: important !== undefined ? Boolean(important) : notes[noteIndex].important,
            updatedAt: new Date().toISOString()
          }
          
          res.status(200).json({
            data: notes[noteIndex],
            message: 'Note updated successfully'
          })
        }
      },
      {
        path: '/:id', // DELETE /api/notes/:id
        method: 'delete',
        middlewares: [setContentType('application/json'), findNoteById],
        handler: (req, res) => {
          const noteIndex = notes.findIndex(n => n.id === req.noteId)
          const deletedNote = notes.splice(noteIndex, 1)[0]
          
          res.status(200).json({
            data: deletedNote,
            message: 'Note deleted successfully'
          })
        }
      }
    ]
  }

  // Aquí podrías agregar más grupos como:
  // users: {
  //   basePath: '/api/users',
  //   routes: [...]
  // },
  // auth: {
  //   basePath: '/api/auth',
  //   routes: [...]
  // }
}

// Registrar todos los grupos de rutas
Object.entries(routeGroups).forEach(([groupName, group]) => {
  const { basePath, routes } = group
  
  console.log(`📁 Registering route group: ${groupName}`)
  
  routes.forEach(route => {
    const { path, method, middlewares = [], handler } = route
    const fullPath = basePath + path
    
    app[method](fullPath, ...middlewares, handler)
    console.log(`   ${method.toUpperCase().padEnd(6)} ${fullPath}`)
  })
})

// Middleware global para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl,
    availableGroups: Object.keys(routeGroups)
  })
})

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

const PORT = process.env.PORT || 3001
const BASE_URL = `http://localhost:${PORT}`

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 API Base URL: ${BASE_URL}`)
  console.log('\n📋 Route Groups Summary:')
  
  Object.entries(routeGroups).forEach(([groupName, group]) => {
    console.log(`\n🔹 ${groupName.toUpperCase()} GROUP:`)
    group.routes.forEach(route => {
      const fullPath = group.basePath + route.path
      console.log(`   ${route.method.toUpperCase().padEnd(6)} ${BASE_URL}${fullPath}`)
    })
  })
})

export default app