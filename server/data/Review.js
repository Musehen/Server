const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let reviewSchema = mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: REQUIRED_VALIDATION_MESSAGE },
  stars: { type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE, min: 1, max: 5 },
  content: { type: mongoose.Schema.Types.String },
  creator: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE }
}, { timestamps: true })

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review
