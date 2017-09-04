const Venue = require('../../data/Venue')
const Review = require('../../data/Review')
const path = require('path')

module.exports.getVenueById = (req, res) => {
  let id = req.params.id
  Venue.findOne({_id: id, isVisible: true}).populate('reviews', '', null, { sort: { 'createdAt': -1 } }).lean().then(venue => {
    if (!venue) {
      return res.status(404).json({ success: false, msg: 'Venue was not found' })
    }
    return res.status(200).json({ success: true, data: venue })
  }).catch(error => {
    console.log(error)
    if (error.name === 'CastError' && error.path === '_id') {
      return res.status(404).json({ success: false, msg: 'Venue was not found' })
    }
    return res.status(500).json({ success: false, msg: 'An error occured.' })
  })
}
module.exports.getMusehenVenues = (req, res) => {
  let pageSize = 10
  let page = Number(req.query.page) || 1
  let search = req.query.search

  let queryArray = []

  let countQuery = Venue.find({ isVisible: true })
  let mainQuery = Venue.find({ isVisible: true })

  if (search) {
    mainQuery = mainQuery.where('name').regex(new RegExp(search, 'i'))
    countQuery = countQuery.where('name').regex(new RegExp(search, 'i'))
  }

  mainQuery
    .sort('-createdAt')
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