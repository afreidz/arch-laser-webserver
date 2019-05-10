const express = require('express')
const router = express.Router()
const notifications = require('../actions/notifications')

router.get('/exist', notifications.exist)
router.get('/count/:type', notifications.countByType)
router.get('/:count?', notifications.getAwesome)
router.post('/', notifications.add)
router.post('/dismiss/:id?', notifications.dismiss)

module.exports = router
