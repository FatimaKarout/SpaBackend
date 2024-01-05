const mongoose = require('mongoose')
const { Schema, model } = mongoose
const Appoitment = new Schema({
  dateTime: { type: Date, required: true },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

})
const appoitment = model('appoitment', Appoitment)
module.exports = appoitment