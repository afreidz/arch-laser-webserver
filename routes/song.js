const express = require('express')
const router = express.Router()
const song = require('../actions/song')

router.get('/title', song.title)
router.get('/artist', song.artist)

module.exports = router
