const request = require('postman-request');
const forecast = (lat, long, callback) => {
  let url =
    'http://api.weatherstack.com/current?access_key=de61c40bc4d2cd40eb901ce3e38b0daf&query=' +
    encodeURIComponent(lat) +
    ',' +
    encodeURIComponent(long);
  request({
    url: url,
    json: true
  }, (error, response) => {
    if (error) {
      callback('Unable to connect to the network!', undefined);
    } else if (response.body.error) {
      callback('Try a different search', undefined);
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        humidity: response.body.current.humidity,
        windspeed: response.body.current.wind_speed,
        visibility: response.body.current.visibility,
      });
    }
  });
};
module.exports = forecast;