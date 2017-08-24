const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let hallSchema = mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  about: { type: mongoose.Schema.Types.String },
  image: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  dimensions: {
    // in meters
    width: {
      type: mongoose.Schema.Types.Decimal,
      min: 1,
      max: 100,
      required: REQUIRED_VALIDATION_MESSAGE
    },
    height: {
      type: mongoose.Schema.Types.Decimal,
      min: 1,
      max: 100,
      required: REQUIRED_VALIDATION_MESSAGE
    },
    accuracy: {
      type: mongoose.Schema.Types.Decimal,
      min: 0.5,
      max: 5,
      default: 1,
      required: REQUIRED_VALIDATION_MESSAGE
    }
  },
  beacons: [
    {
      address: {
        type: mongoose.Schema.Types.String,
        required: REQUIRED_VALIDATION_MESSAGE
      }
    }
  ],
  positions: [
    {
      x: {
        type: mongoose.Schema.Types.Number,
        min: 0,
        max: 200,
        required: REQUIRED_VALIDATION_MESSAGE
      },
      y: {
        type: mongoose.Schema.Types.Number,
        min: 0,
        max: 200,
        required: REQUIRED_VALIDATION_MESSAGE
      },
      data: [{
        // Received signal strength indication a.k.a RSSI
        rssi: {
          type: mongoose.Schema.Types.Decimal,
          required: REQUIRED_VALIDATION_MESSAGE,
          min: -90,
          max: 0
        },
        beaconAddress: {
          type: mongoose.Schema.Types.String,
          required: REQUIRED_VALIDATION_MESSAGE
        }
      }]
    }
  ],
  // TODO: map with the proper notifications when entered in given zones
}, { timestamps: true })

let Hall = mongoose.model('Hall', hallSchema)

module.exports = Hall
