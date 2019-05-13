const low = require('lowdb')
const path = require('path')
const Joi = require('@hapi/joi')
const shortid = require('shortid')
const FileSync = require('lowdb/adapters/FileSync')

const dir = require('./directory')()
const dbfile = path.join(dir, 'notifications.json')
const key = 'notifications'

let adapter = new FileSync(dbfile)
let db = low(adapter)
let schema = {
  notification: Joi.object().keys({
    id: Joi.any().required(),
    time: Joi.date().greater(new Date()).required(),
    type: Joi.any().valid(['info', 'alert']).required(),
    source: Joi.string().max(75),
    content: Joi.string().min(2).max(300).required()
  })
}

if (!db.has(key).value()) { db.set(key, []).write() }

module.exports = {
  get (count = null) {
    if (count) {
      return db.get(key).take(count).value()
    }
    return db.get(key).value()
  },
  push (item) {
    let entry = {
      id: shortid.generate(),
      time: new Date(),
      ...item
    }
    let { error, value } = Joi.validate(entry, schema.notification)
    if (error) throw error

    return db.get(key).push(value).write()
  },
  dismiss (id = null) {
    if (id) {
      return db.get(key).remove({ id }).write()
    } else {
      return db.get(key).remove().write()
    }
  },
  find (fn) {
    return db.get(key).filter(fn).value()
  }
}
