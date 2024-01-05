const mongoose = require('mongoose')
const { Schema, model } = mongoose
const Service = new Schema({
    name: { type: string, required: true },
    information: { duration: { type: string, required: true }, benefits: { type: string, required: true }, description: { type: string, required: true } },
    price: { type: string, required: true },
})
const service = model('service', Service)
module.exports = service