//const http = require('http') //Noden sisäänrakennettu moduuli, määrittelee web-palvelimen
const express = require('express')
const app = express()

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
const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json'})
    res.end(JSON.stringify(persons))
})
*/
const timestamp = Date.now() //tbc

//tämä on route
app.get('/', (req, res) => {
    console.log('timestamp', timestamp)
    res.send(
        '<p>Phonebook has info for all Swedes +20 yrs old </p>',
        )
})


//tämä on route, ja myös tapahtumankäsittelijä, they say
app.get('/persons', (req, res) => {
    res.json(persons)
})

//tämä on route, joka mahdollistaa yksittäisen resurssin katsomisen.
app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)    //muuttaa tyypin String --> Number
    const person = persons.find(person => person.id === id)
   
    if (person) {   //JS-olio on vertailuoperaatiossa truthy! 
        res.json(person)
    } else {        //'undefined' on vastaavasti falsy!
        res.status(404).end()
    }    
})

const port = 3001
app.listen(port, () => {
    console.log(`Server swimming thro port ${port}`)
})