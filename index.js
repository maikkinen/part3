
//const http = require('http') //Noden sisäänrakennettu moduuli, määrittelee web-palvelimen
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser') //tämä otus on middleware.
const morgan = require('morgan')          //toinen samanmoinen middleware-otus.
const mongoose = require('mongoose')
const Contact = require('./models/contact')

morgan.token('type', (req, res) => { return JSON.stringify(req.body.name)}) //console.log(JSON.stringify(req.body.number))  <-- tulee tekstiä ulos

app.use(bodyParser.json()) 
app.use(morgan(':method :url :status :req[type] :res[content-length] - :response-time ms ')) //oli: 'tiny'
app.use(express.static('build'))


const timestamp = new Date()

let persons = [
    {
        id: 1,
        name:"Maija Mehiläinen",
        number:"+456 789 6789" 

    },
    {
        id: 2,
        name:"Onni Orava",
        number:"+345 11 2345" 

    },
    {
        id: 3,
        name:"Liisa Lokki",
        number:"+98 674 34534" 

    },
    {
        id: 4,
        name:"Elli Elefantti",
        number:"+34 345 345 1111" 

    },
    {
        id: 5,
        name:"Kaisa Kuoriainen",
        number:"+01 1243 2345 55" 

    },
    {
        id: 6,
        name:"Antero Antiluuppi",
        number:"+123 123 123 444 12" 

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

app.post('/api/persons', (req, res) => {
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

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
    //persons = persons.concat(person)

    //res.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server swimming thro port ${PORT}`)
})
