const { exec } = require('child_process')
const batteryPercentageCmd = 'upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "percentage"'
const batteryStateCmd = 'acpi -b'

exports.getPercentage = function (req, res) {
  exec(batteryPercentageCmd, (err, out) => {
    if (err) res.status(400).send(err)
    let percentage = out.replace(/\s/g, '').replace('percentage:', '').replace('%', '')
    res.send(percentage)
  })
}

exports.isCharging = function (req, res) {
  exec(batteryStateCmd, (err, out) => {
    if (err) res.status(400).send(err)
    res.send(!out.toLowerCase().includes('discharging'))
  })
}
