const express = require('express')
const router = express.Router()
const quotes = require('../actions/quotes')

router.get('/count', quotes.count)
router.get('/random', quotes.random)
router.get('/filter', quotes.filter)

module.exports = router
