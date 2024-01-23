const mongoose = require('mongoose')
const { Schema, model } = mongoose
const Appoitment = new Schema({
  dateTime: { type: Date, required: true },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'service',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

})
const appoitment = model('appoitment', Appoitment)
module.exports = appoitment