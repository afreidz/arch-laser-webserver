const { exec } = require('child_process')
const prettyBytes = require('pretty-bytes')
const diskStatusCmd = 'df | grep -E "dev/sda3" | awk {\'print $(NF-3),$(NF-2),$(NF-1)\'}'

exports.status = function (req, res) {
  exec(diskStatusCmd, (err, out) => {
    if (err) res.status(400).send(err)
    let values = out.replace('\n', '').split(' ')
    let used = prettyBytes(Number(values[0]) * 1024)
    let free = prettyBytes(Number(values[1]) * 1024)
    let percentage = values[2].replace('%', '')
    res.send([used, free, percentage].join('\n'))
  })
}
