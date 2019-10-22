//const http = require('http') //Noden sisäänrakennettu moduuli, määrittelee web-palvelimen
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Contact = require('./models/contact')
const uniqueValidator = require('mongoose-unique-validator')

morgan.token('type', (req, res) => { return JSON.stringify(req.body.name)}) //console.log(JSON.stringify(req.body.number))  <-- tulee tekstiä ulos

app.use(express.static('build'))
app.use(bodyParser.json()) 
app.use(morgan(':method :url :status :req[type] :res[content-length] - :response-time ms ')) //oli: 'tiny'

const timestamp = new Date()

let persons = [
{
    id: 1,
    name: "Maija Mehiläinen",
    number: "+456 789 6789" 
},
{
    id: 2,
    name: "Onni Orava",
    number: "+345 11 2345" 
},
{
    id: 3,
    name: "Liisa Lokki",
    number: "+98 674 34534" 

},
{
    id: 4,
    name: "Elli Elefantti",
    number: "+34 345 345 1111" 
},
{
    id: 5,
    name: "Kaisa Kuoriainen",
    number: "+01 1243 2345 55" 
},
{
    id: 6,
    name: "Antero Antiluuppi",
    number: "+123 123 123 444 12" 
}
]
app.get('/info', (req, res) => {
  console.log("sup gorgeous")
  res.send(`Phonebook has info for ${persons.length} piipul, and it's ${timestamp} today.`)
})

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
  res.json(contacts.map(contact => contact.toJSON())) //persons tai people
  });
})

//tämä on route, joka mahdollistaa yksittäisen resurssin katsomisen.
app.get('/api/persons/:id', (req, res, next) => {
    const id = Number(req.params.id)    //muuttaa tyypin String --> Number
    Contact.findById(req.params.id)
    .then(person => { 
        if (person) {   //JS-olio on vertailuoperaatiossa truthy! 
                res.json(person.toJSON())
            } else {        //'undefined' on vastaavasti falsy!
                res.status(404).end()
            }    
        })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, response, next) => {
    Contact.findByIdAndRemove(req.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const name = req.body.name
    const number = req.body.number

    if(!name || !number) {
        return res.status(400).json({
            error: 'content missing dude'
        })
    } else if(persons.map(dude => dude.name).includes(name)) {
        return res.status(400).json({
            error: 'please, give a unique name'
        })
    }

    const person = new Contact({ //<---tämä on konstruktorifunktio
        name: name,
        number: number,
        id: Math.floor(Math.random() * 10000)
    })

    person.save()
        .then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))   
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    console.log(req.body.name)
    console.log(req.body.number)
    console.log(req.body.id)

    const person = {
        name: body.name,
        number: body.number,
        id: req.body.id
    }

    Contact.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedContact => {
            res.json(updatedContact.toJSON())
        })
        .catch(error => {
            next(error)
            console.log(error.response.data)
        })
})

//tääl händlätään olemattomat osoitteet
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'wuut endpoint is that dude?!' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'wuuuut id is that dude?!?'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server swimming thro port ${PORT}`)
})
