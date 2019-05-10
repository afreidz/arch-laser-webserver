const { exec } = require('child_process')
const prettyBytes = require('pretty-bytes')
const memStatusCmd = "free -b | grep Mem | awk '{ print $3, $2 }'"

exports.status = function (req, res) {
  exec(memStatusCmd, (err, out) => {
    let results = out.replace('\n', '').split(' ')
    let percentage = Number(results[0] / results[1] * 100)

    if (err) res.status(400).send(err)
    res.send(`${prettyBytes(Number(results[0]))}\n${prettyBytes(Number(results[1]))}\n${percentage}`)
  })
}
