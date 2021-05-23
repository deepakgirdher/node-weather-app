const request = require('request')
const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=0f8e41558e8306b53de70c16365f21f5&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        temp: body.current.temperature,
        desc: body.current.weather_descriptions[0]
      })
    }
  })

}

module.exports = forecast