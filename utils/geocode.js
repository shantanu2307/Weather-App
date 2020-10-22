const request = require('postman-request');
const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoic2hhbnRhbnUyMzA3IiwiYSI6ImNrZnM2OWtocTBlcnMycHBkbnllZzdhNDQifQ.BL6KLDWhhEEyEdWLqAAqaQ';
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location');
    } else {
      const lat = response.body.features[0].center[1];
      const lon = response.body.features[0].center[0];
      const name = response.body.features[0].place_name;
      let coodrinates = {
        latitude: lat,
        longitude: lon,
        place: name,
      };
      callback(undefined, coodrinates);
    }
  });
};

module.exports = geocode;
