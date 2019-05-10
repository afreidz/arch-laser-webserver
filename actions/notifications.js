const { notifications } = require('../database')
const humanize = require('humanize-duration')

exports.get = (req, res) => res.json(notifications.get(req.params.count))

exports.getAwesome = function awesomeNotifications (req, res) {
  let notes = notifications.get(req.params.count)
  let requestTime = new Date()
  let body = ''
  for (let note of notes) {
    body += `${note.id}\n`
    body += `${humanize(requestTime - new Date(note.time), { round: true, units: ['d', 'h', 'm'] })}\n`
    body += `${note.type}\n`
    body += `${note.source ? note.source : null}\n`
    body += `${note.content}\n`
    body += `~~~\n`
  }
  res.send(body)
}

exports.add = (req, res) => {
  try {
    let note = notifications.push(req.body)
    res.json(note)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.dismiss = (req, res) => {
  try {
    let note = notifications.dismiss(req.params.id)
    res.json(note)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.countByType = (req, res) => {
  let all = notifications.find(n => n.type === req.params.type)
  res.send(`${all.length}`)
}

exports.exist = (req, res) => {
  let all = notifications.get()
  res.send(all.length > 0)
}
