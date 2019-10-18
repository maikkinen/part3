const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
} else if (!process.argv[3]) {
    console.log('Heres all de peeps in de phonebook currently')
}


const password = process.argv[2]

const url =
    `mongodb+srv://Sintti-Clusteroid:${password}@closterud-bchpd.mongodb.net/telefonbackend?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Contact = mongoose.model('Contact', contactSchema)

if (!process.argv[3]) {
    console.log('Da phonebook atm honey:')

    Contact.find({}).then(result => {
        result.forEach(contact => {
          console.log(`${contact.name} ${contact.number}`)
        })
    process.exit(1)
    })
}

const contact = new Contact({
  name: process.argv[3], //'Aaro Arokettu',
  number: process.argv[4], //'+358 40 445 2343',
  id: Math.floor(Math.random() * 10000)
})



contact.save().then(response => {
  console.log(`${contact.name} ${contact.number} has been added honey!`);
  mongoose.connection.close();
})