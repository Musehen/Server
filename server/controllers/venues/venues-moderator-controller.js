const Venue = require('../../data/Venue')
const Review = require('../../data/Review')
const path = require('path')

module.exports.editVenue = (req, res) => {
  let userId = req.user._id
  let newImage = req.file
  let id = req.params.venueId
  let editedVenue = req.body

  Venue.findOne({_id: id, moderators: userId}).then((venue) => {
    if (!venue) {
      return res.status(404).json({ success: false, msg: 'Venue was not found' })
    }
    venue.name = editedVenue.name
    venue.about = editedVenue.about
    venue.category = editedVenue.category
    venue.location = editedVenue.location
    if (newImage) {
      venue.image = newImage.filename
    }
    venue.save().then(() => {
      Review.find({ venue: venue._id }).then((reviews) => {
        venue.reviews = reviews
        return res.status(200).json({ success: true, data: venue })
      })
    })
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ success: false, msg: 'An error occured.' })
  })
}
module.exports.getModeratorVenues = (req, res) => {
  let userId = req.user._id
  let pageSize = 10
  let page = Number(req.query.page) || 1
  let search = req.query.search

  let queryArray = []

  let countQuery = Venue.find({ moderator: userId })
  let mainQuery = Venue.find({ moderator: userId })

  if (search) {
    mainQuery = mainQuery.where('name').regex(new RegExp(search, 'i'))
    countQuery = countQuery.where('name').regex(new RegExp(search, 'i'))
  }

  mainQuery
    .sort('-updatedAt')
    .skip((page - 1) * pageSize)
    .limit(pageSize)

  countQuery.count()

  queryArray.push(mainQuery)
  queryArray.push(countQuery)

  Promise.all(queryArray)
    .then(resolutions => {
      let objToReturn = {}
      objToReturn.products = resolutions[0]
      objToReturn.pagesCount = Math.ceil(resolutions[1] / pageSize)
      return res.status(200).json({ success: true, data: objToReturn })
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ success: false, msg: 'An error occured.' })
    })
}