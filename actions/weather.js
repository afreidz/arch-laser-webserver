const fetch = require('node-fetch')
const geoURL = new URL('https://freegeoip.app/json/')
const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
const weatherKey = '10180d686ac32250e7b861573d022126'

async function getGeoData () {
  let response = await fetch(geoURL)
  return response.json()
}

async function getWeather () {
  let { latitude, longitude } = await getGeoData()
  weatherURL.searchParams.set('appid', weatherKey)
  weatherURL.searchParams.set('units', 'imperial')
  weatherURL.searchParams.set('lat', latitude)
  weatherURL.searchParams.set('lon', longitude)

  let response = await fetch(weatherURL)
  let data = await response.json()

  return data
}

async function getWeatherAwesome () {
  let data = await getWeather()

  let temp = Math.round(data.main.temp)
  let desc = data.weather[0].description
  let humidity = `Humidity: ${data.main.humidity}%`
  let loc = `${data.name}, ${data.sys.country}`

  desc = desc.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')

  return [temp, desc, humidity, loc].join('\n')
}

exports.weather = async (req, res) => {
  res.json(await getWeather())
}
exports.weatherAwesome = async (req, res) => {
  res.send(await getWeatherAwesome())
}
