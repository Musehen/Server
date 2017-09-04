const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let venueSchema = mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  about: { type: mongoose.Schema.Types.String },
  image: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  category: {
    type: mongoose.Schema.Types.String,
    default: ['unknown'],
    enum: ['gallery', 'museum', 'office', 'unknown']
  },
  location: {
    latitude: {
      type: mongoose.Schema.Types.Decimal,
      min: -90,
      max: 90,
      required: REQUIRED_VALIDATION_MESSAGE
    },
    longitude: {
      type: mongoose.Schema.Types.Decimal,
      min: -180,
      max: 180,
      required: REQUIRED_VALIDATION_MESSAGE
    }
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: REQUIRED_VALIDATION_MESSAGE, unique: true }],
  floors: [
    {
      number: {
        type: mongoose.Schema.Types.Number,
        min: 0,
        max: 50,
        required: REQUIRED_VALIDATION_MESSAGE
      },
      halls: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: REQUIRED_VALIDATION_MESSAGE
      }]
    }
  ],
  owner: { type: mongoose.Schema.Types.String, ref: 'User', required: REQUIRED_VALIDATION_MESSAGE },
  moderators: [{ type: mongoose.Schema.Types.String, ref: 'User', required: REQUIRED_VALIDATION_MESSAGE, unique: true}],
  isVisible: { type: mongoose.Schema.Types.Boolean, required: REQUIRED_VALIDATION_MESSAGE, default: false }
}, { timestamps: true })

let Venue = mongoose.model('Venue', venueSchema)

module.exports = Venue
