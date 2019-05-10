const { exec } = require('child_process')
const getCmd = 'amixer sget Master | grep \'Right: \' | awk -F\'[][]\' \'{ print $2 }\''
const setCmd = 'amixer set Master'
const muteCmd = 'amixer sset Master toggle'
const isMutedCmd = 'amixer sget Master'

function getVolume (cb) {
  exec(getCmd, (err, out, serr) => {
    if (err) cb(err, null)
    let percentage = out.replace('\n', '').replace('%', '')
    let display = `${percentage.padStart(4, ' ')}  %`
    cb(null, [percentage, display].join('\n'))
  })
}

exports.get = function (req, res) {
  getVolume(function (err, status) {
    if (err) res.status(400).send(err)
    res.send(status)
  })
}

exports.set = function (req, res) {
  exec(`${setCmd} ${req.body.volume}`, (err, out) => {
    if (err) res.status(400).send(err)
    getVolume(function (err, status) {
      if (err) res.status(400).send(err)
      res.send(status)
    })
  })
}

exports.mute = function (req, res) {
  exec(muteCmd, (err, out) => {
    if (err) res.status(400).send(err)
    res.send(out.trim().split('\n').pop().includes('off'))
  })
}

exports.ismuted = function (req, res) {
  exec(isMutedCmd, (err, out) => {
    if (err) res.status(400).send(err)
    res.send(out.trim().split('\n').pop().includes('off'))
  })
}
