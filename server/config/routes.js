const controllers = require('../controllers')
const auth = require('./auth')()
const router = require('express').Router()
const path = require('path')
const randomId = require('random-id')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  },
  filename: function (req, file, cb) {

    cb(null, randomId() + path.extname(file.originalname))
  }
})

const uploader = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // accept archives only
    if (!file.originalname.match(/\.(png|jpeg|jpg|tiff)$/)) {
      return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
  }
})

module.exports = (app) => {

  router.all('*', (req, res) => {
    res.status(404).json({success: false, msg: '404 Not Found!'})
  })

  app.use('/api/', router)
}
