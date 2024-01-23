const mongoose = require('mongoose')
const { Schema, model } = mongoose
const Service = new Schema({
    name: { type: String, required: true },
    information: { duration: { type: String, required: true }, benefits: { type: String, required: true }, description: { type: String, required: true } },
    price: { type: String, required: true  },
    image:{ type: String, required: true }
})
const service = model('service', Service)
module.exports = service