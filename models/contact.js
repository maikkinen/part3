const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connectin to dis: ', url)

mongoose.connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('connected to your super amazing MongoDB ')
    })
    .catch((error) => {
        console.log('buu we failed to connect to MongoDB: ', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3},
    number: { type: String, unique: true, required: true, minlength: 8},
    id: { type: String},
    })

contactSchema.plugin(uniqueValidator) // addaa unique-validointi skeemaan
      
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)