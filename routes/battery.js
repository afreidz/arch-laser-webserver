const express = require('express')
const router = express.Router()
const battery = require('../actions/battery')

router.get('/charging', battery.isCharging)
router.get('/percentage', battery.getPercentage)

module.exports = router
