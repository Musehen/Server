const users = require('./users-controller')

const adminVenues = require('./venues/venues-admin-controller')
const ownerVenues = require('./venues/venues-owner-controller')
const moderatorVenues = require('./venues/venues-moderator-controller')
const userVenues = require('./venues/venues-user-controller')
const publicVenues = require('./venues/venues-public-controller')

module.exports = {
  users: users,
  venues: {
    admin: adminVenues,
    owner: ownerVenues,
    moderator: moderatorVenues,
    user: userVenues,
    public: publicVenues
  }
}
