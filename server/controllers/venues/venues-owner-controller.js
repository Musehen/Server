const Venue = require('../../data/Venue')
const Review = require('../../data/Review')
const path = require('path')

module.exports.addVenue = (req, res) => {
  let userId = req.user._id
  let image = req.file
  let venueData = req.body
  let venue={};
  if (image) {
    venue.image = image.filename
  }
  venue.owner = userId
  venue.moderators = [userId]
  venue.name = venueData.name
  venue.about = venueData.about
  venue.category = venueData.category
  venue.location = venueData.location
  console.log(venue)

  Venue.create(venue).then((createdVenue) => {
    return res.status(200).json({ success: true, data: createdVenue })
  }).catch((err) => {
    console.log(err)
    return res.status(500).json({ success: false, msg: 'Venue cannot be created.' })
  })
}

module.exports.getOwnerVenues = (req, res) => {
  let username = req.user._id
  let pageSize = 10
  let page = Number(req.query.page) || 1
  let search = req.query.search

  let queryArray = []

  let countQuery = Venue.find({ owner: username })
  let mainQuery = Venue.find({ owner: username })

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
      objToReturn.venues = resolutions[0]
      objToReturn.pagesCount = Math.ceil(resolutions[1] / pageSize)
      return res.status(200).json({ success: true, data: objToReturn })
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ success: false, msg: 'An error occured.' })
    })
}

module.exports.addModerator = (req, res) => {
  let userId = req.user._id
  let venueId = req.params.venueId
  let moderatorId = req.params.moderatorId
  console.log(venueId,moderatorId, userId)
  Venue.findOneAndUpdate({_id: venueId, owner: userId }, { $addToSet: {moderators: moderatorId} }, {new: true}).then((venue) => {
    if (!venue) {
      return res.status(404).json({ success: false, msg: 'Venue was not found.' })
    }
    return res.status(200).json({ success: true, data: venue, msg: 'Moderator added successfully.' })
  }).catch(console.log)
}

module.exports.removeModerator = (req, res) => {
  let userId = req.user._id
  let venueId = req.params.venueId
  let moderatorId = req.params.moderatorId
  Venue.findOneAndUpdate({_id: venueId, owner: userId }, { $pull : { moderators: moderatorId }}, {new: true}).then((venue) => {
    if (!venue) {
      return res.status(404).json({ success: false, msg: 'Venue was not found.' })
    }
    return res.status(200).json({ success: true, data: venue, msg: 'Moderator removed successfully.' })
  }).catch(console.log)
}

