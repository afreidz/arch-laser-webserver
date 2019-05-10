const express = require('express')
const router = express.Router()
const disk = require('../actions/disk')

router.get('/status', disk.status)

module.exports = router
