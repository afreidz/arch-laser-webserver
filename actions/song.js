const { exec } = require('child_process')
const artistCmd = 'ncmpcpp -q --current-song=%a'
const titleCmd = 'ncmpcpp -q --current-song=%t'

exports.artist = function (req, res) {
  exec(artistCmd, (err, out) => {
    if (err) return res.send('')
    res.send(out)
  })
}

exports.title = function (req, res) {
  exec(titleCmd, (err, out) => {
    if (err) return res.send('')
    res.send(out)
  })
}
