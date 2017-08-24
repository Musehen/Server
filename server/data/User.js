const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  username: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true, dropDups: true },
  email: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true, dropDups: true },
  firstName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  lastName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  password: String,
  roles: {
    type: [String],
    default: ['normal'],
    enum: ['normal', 'admin']
  },
  profilePic: {
    type: String,
    default: 'http://i.imgur.com/upiaF0M.png'
  },
  banned: { type: Boolean, required: REQUIRED_VALIDATION_MESSAGE, default: false }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (!users.length)
      return encryption.generateHash('tainamaina').then(hashedPass => {
        User.create({
          username: 'nelly',
          email: 'nelly.m.mincheva@gmail.com',
          firstName: 'Nelly',
          lastName: 'Mincheva',
          profilePic: 'https://avatars2.githubusercontent.com/u/8746363?v=4&s=460',
          password: hashedPass,
          roles: ['admin', 'normal']
        })
      })
  })
}
