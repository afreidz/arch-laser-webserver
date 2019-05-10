const fs = require('fs')
const path = require('path')
const home = require('os').homedir()
const dir = path.join(home, '.database')

module.exports = function () {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  return dir
}
