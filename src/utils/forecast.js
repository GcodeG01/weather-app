const request = require('request')

const forecast = (latitude, longitude, callback) => {
   const url = `https://api.darksky.net/forecast/f5ff734622a902c7087d5da0b1731019/${latitude},${longitude}`

   request({
      url,
      json: true
   }, (error, { body }) => { // was response instead of {body} ex. response.body...
      const temperature = body.currently.temperature
      const precipProbability = body.currently.precipProbability
      const humidity = body.currently.humidity
      const summary = body.daily.data[0].summary

      if (error) {
         callback('Unable to connect to weather services!', undefined)
      } else if (body.code === 400) {
         callback(body.error)
      } else {
         callback(undefined,  
            `${summary} It is currently ${temperature} degrees fahrenheit outside. There is a ${precipProbability}% chance of rain. Humidity is at ${humidity * 100}%`
         )
      }
   })
}

module.exports = forecast