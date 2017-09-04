const Venue = require('../../data/Venue')


module.exports.showVenue = (req, res) => {
  let venueId = req.params.id
  Venue.findByIdAndUpdate(venueId, { isVisible: true }, {new: true}).then((venue) => {
    if (!venue) {
      return res.status(404).json({ success: false, msg: 'Venue was not found.' })
    } else {
      return res.status(200).json({ success: true, data: venue, msg: 'Venue is now being shown in Musehen.' })
    }
  }).catch(console.log)
}

module.exports.hideVenue = (req, res) => {
  let venueId = req.params.id
  Venue.findByIdAndUpdate(venueId, { isVisible: false }, {new: true}).then((venue) => {
    if (!venue) {
      return res.status(404).json({ success: false, msg: 'Venue was not found' })
    }
    return res.status(200).json({ success: true, data: venue, msg: 'Venue is now hidden in Musehen' })
  }).catch(console.log)
}
