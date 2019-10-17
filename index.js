
//const http = require('http') //Noden sisäänrakennettu moduuli, määrittelee web-palvelimen
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser') //tämä otus on middleware.
const morgan = require('morgan')          //toinen samanmoinen middleware-otus.
const cors = require('cors') // mitä nää require('jotain')-otukset itse asiassa on?

morgan.token('type', (req, res) => { return JSON.stringify(req.body.name)}) //console.log(JSON.stringify(req.body.number))  <-- tulee tekstiä ulos


app.use(bodyParser.json()) 
app.use(morgan(':method :url :status :req[type] :res[content-length] - :response-time ms ')) //oli: 'tiny'
app.use(express.static('build'))

// pitää varmaan käyttää req koska esim POST tehtäessä meillä on se person-objecti requestissa
// morgan.token('type', function (req, res) { return req.headers['content-type'] })
// replace 'type' w/name, ja req.headers --> jollain mitä haluut näyttää.


// jos haluat conffata uuden morganin, joka näyttää tinyn lisäksi myös js objektin kenttineen
// dvs myös person name, number, id, niin makes sense että pit käyt json.stringify()
// koska muuten ej varmaan tajuu.

// "json.stringify() converts a JS object or value to a JSON string.""

const timestamp = new Date()

/*
    Middlewaret otetaan käyttöön just siin järkäs jossa ne on kirjoitettu.
    Ne tulee myös ottaa käyttöön ennen routeja, jos ne halutaan suorittaa ennen routeja.
*/

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
/*
app.get('/', (req, res) => {
    console.log("i like ice cream")
    res.send('hello world')
})
*/

//tämä on route
app.get('/api/persons', (req, res) => {
    console.log("sup gorgeous")
    res.send(`Phonebook has info for ${persons.length} piipul, and it's ${timestamp} today.`)
})


//tämä on route, ja myös tapahtumankäsittelijä, they say
app.get('/api/persons', (req, res) => {
    console.log("not much handsome")
    res.json(persons)
})

//tämä on route, joka mahdollistaa yksittäisen resurssin katsomisen.
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)    //muuttaa tyypin String --> Number
    const person = persons.find(person => person.id === id)
   
    if (person) {   //JS-olio on vertailuoperaatiossa truthy! 
        res.json(person)
    } else {        //'undefined' on vastaavasti falsy!
        res.status(404).end()
    }    
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log("tiny tiny indeeds babe")
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const name = req.body.name
    const number = req.body.number
    const mappedNames = persons.map(dude => dude.name)
    
    console.log("heres4", req.body)
    console.log(mappedNames)
    
    if(!name || !number) {
        return res.status(400).json({
            error: 'content missing dude'
        })
    } else if(persons.map(dude => dude.name).includes(name)) {
        return res.status(400).json({
            error: 'please, give a unique name'
        })
    }

    const person = {
        name: name,
        number: number,
        id: Math.floor(Math.random() * 1000)
    }

    console.log("dis is d nuu piipul ", person)
    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server swimming thro port ${PORT}`)
})
