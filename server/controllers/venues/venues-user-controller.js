const Venue = require('../../data/Venue')
const Review = require('../../data/Review')
const path = require('path')

module.exports.addReview = (req, res) => {
  console.log(req.user)
  if (req.user.banned) {
    return res.status(400).json({ success: false, msg: 'You cannot add reviews' })
  }
  let review = req.body
  let venueId = req.params.id
  review.creator = req.user.username
  console.log(req.user)
  review.venue = venueId

  Venue.findById(venueId).then((venue) => {
    if (!venue) {
      return res.status(404).json({ success: false, msg: 'Venue was not found' })
    }
    return Review.create(review).then((review) => {
      venue.reviews.push(review._id)
      venue.save().then(() => {
        return res.status(200).json({ success: true, data: review, msg: 'Review added successfully' })
      })
    })
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ success: false, msg: 'Server Error' })
  })
}
