const express = require('express')
const bodyParser = require('body-parser')
const diskRoutes = require('./routes/disk')
const songRoutes = require('./routes/song')
const quoteRoutes = require('./routes/quotes')
const volumeRoutes = require('./routes/volume')
const memoryRoutes = require('./routes/memory')
const weatherRoutes = require('./routes/weather')
const batteryRoutes = require('./routes/battery')
const notificationRoutes = require('./routes/notifications')

const port = 1337
const app = express()

app.use(bodyParser())
app.use((req, res, next) => {
  console.log(`${Date.now()} - ${req.method} ${req.originalUrl} - Query: ${JSON.stringify(req.query)} - Body: ${JSON.stringify(req.body)}`)
  next()
})

app.use('/disk', diskRoutes)
app.use('/song', songRoutes)
app.use('/quotes', quoteRoutes)
app.use('/volume', volumeRoutes)
app.use('/memory', memoryRoutes)
app.use('/weather', weatherRoutes)
app.use('/battery', batteryRoutes)
app.use('/notifications', notificationRoutes)
app.listen(port, () => console.log(`Lazer Server is listening on port ${port}!`))
