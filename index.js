const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

require('dotenv').config()

const Phonebook = require('./models/note')

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]




// app.get('/api/persons', (request, response) => {
//     response.json(persons)
// })

app.get('/api/persons', (request, response) => {
    Phonebook.find({}).then(person => {
        response.json(person)
    })
})

app.get('/info', (request, response) => {
    const currentDate = new Date()
    let length = persons.length

    response.send(`
        <p>Phonebook has info for ${length} people</p>
        <p>${currentDate.toLocaleString()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    // const id = request.params.id
    //
    // const person = persons.find(person => person.id === id)
    //
    // if (person) {
    //     response.json(person)
    // } else {
    //     console.log('x')
    //     response.status(404).end()
    // }

    Phonebook.findById(request.params.id).then(person => {
        response.json(person)
    })

})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

})


// app.post('/api/persons', (request, response) => {
//     const body = request.body
//
//     let id2 = Math.floor(Math.random() * 1000000).toString()
//
//     if (!body.name|| !body.number) {
//         return response.status(400).json({
//             error: 'content missing'
//         })
//     }
//
//     let name = persons.find(person => person.name === body.name)
//     if(name){
//         return response.status(400).json({
//             error: 'name must be unique'
//         })
//     }
//
//
//     const person = {
//         id: id2,
//         name: body.name,
//         number: body.number,
//     }
//
//     persons = persons.concat(person)
//
//     response.json(persons)
// })

app.post('/api/persons', (request, response) => {
    const body = request.body

    let id2 = Math.floor(Math.random() * 1000000).toString()

    if (body.name === undefined|| body.number === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    // let name = persons.find(person => person.name === body.name)
    // if(name){
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }


    const person = new Phonebook({
        name: body.name,
        number: body.number,
    })

    // persons = persons.concat(person)

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




