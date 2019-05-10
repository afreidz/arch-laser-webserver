const { quotes } = require('../database')

function randomNumber (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

exports.count = (req, res) => res.send(`${quotes.count()}`)

exports.random = (req, res) => {
  let count = quotes.count()
  let index = randomNumber(count)
  let quote = quotes.all()[index]

  res.send(`${quote.QUOTE}\n${quote.AUTHOR}`)
}

exports.filter = (req, res) => {
  res.json(quotes.filter())
}
