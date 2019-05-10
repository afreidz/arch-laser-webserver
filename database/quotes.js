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
  },
  filter () {
    let keepers = ['cool', 'inspirational', 'intelligence', 'wisdom']
    let genres = new Set()
    let all = db.get(key).value()
    for (let q of all) {
      genres.add(q.GENRE)
    }

    for (let genre of genres) {
      if (!keepers.includes(genre)) {
        db.get(key).remove({ 'GENRE': genre }).write()
      }
    }

    return this.count()
  }
}
