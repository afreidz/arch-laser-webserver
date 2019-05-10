const express = require('express')
const router = express.Router()
const volume = require('../actions/volume')

router.get('/', volume.get)
router.post('/', volume.set)
router.post('/mute', volume.mute)
router.get('/mute', volume.ismuted)

module.exports = router
