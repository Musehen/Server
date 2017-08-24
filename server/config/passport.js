const passport = require('passport')
const User = require('../data/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'jwt-secret-key'
}

module.exports = () => {
  let strategy = new JwtStrategy(opts, function (payload, done) {
    User.findById(payload._doc._id)
      .then((user) => {
        if (user) return done(null, user)
        return done(null, false)
      })
      .catch((error) => {
        return done(error, false)
      })
  })

  passport.use(strategy)
  return passport
}
