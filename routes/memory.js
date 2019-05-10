const express = require('express')
const router = express.Router()
const memory = require('../actions/memory')

router.get('/status', memory.status)

module.exports = router
