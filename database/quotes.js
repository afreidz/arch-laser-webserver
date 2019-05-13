const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')

const dir = require('./directory')()
const dbfile = path.join(dir, 'quotes.json')
const key = 'quotes'

let adapter = new FileSync(dbfile)
let db = low(adapter)
if (!db.has(key).value()) { db.set(key, []).write() }

module.exports = {
  count () {
    return db.get(key).value().length
  },
  all () {
    return db.get(key).value()
  }
}
