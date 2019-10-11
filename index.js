
//const http = require('http') //Noden sisäänrakennettu moduuli, määrittelee web-palvelimen
const express = require('express')
const app = express()
const path = require('path')

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


const timestamp = new Date() //tbc

//tämä on route
app.get('/', (req, res) => {
    //console.log('timestamp', timestamp)
    //res.sendFile('index.html')
    console.log("heres in get babe")
    console.log("timestamp", timestamp)
    res.send(`Phonebook has info for ${persons.length} piipul, and it's ${timestamp} today.`)
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

app.delete('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const port = 3001
app.listen(port, () => {
    console.log(`Server swimming thro port ${port}`)
})



/*
const ShowInBrowser = () => {
    return (
        <div>
            <p>Phonebook has info for {persons.size}</p>
            <p>It's {timestamp} o'clock. </p>
        </div>
    )
}
*/