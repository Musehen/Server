const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan = require('morgan')
const cors = require('cors')
module.exports = (app) => {
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(morgan('common'))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cors())
  app.use(express.static('public'))
  console.log('Express ready!')
}
