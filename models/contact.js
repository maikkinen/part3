const mongoose = require('mongoose')

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
    name: String,
    number: String,
    id: Number,
    })
      
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)