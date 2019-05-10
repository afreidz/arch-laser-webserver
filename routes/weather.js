const express = require('express')
const router = express.Router()
const actions = require('../actions/weather')

router.get('/', actions.weather)
router.get('/awesome', actions.weatherAwesome)

module.exports = router
