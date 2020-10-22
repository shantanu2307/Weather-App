const geocode = require('../utils/geocode.js');
const forecast = require('../utils/forecast.js');
const hbs = require('hbs');
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//Define Path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

//Set up Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Shantanu Goyal',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Shantanu Goyal',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help page',
    name: 'Shantanu Goyal',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'Failed to recieve an address!',
    });
    return;
  }
  var add = req.query.address;
  geocode(add, (error, data) => {
    if (error) {
      res.send({
        error: error,
      });
      return;
    }
    forecast(data.latitude, data.longitude, (error, fordata) => {
      if (error) {
        res.send({
          error: error,
        });
        return;
      }
      res.send({
        location: data.place,
        forecast: fordata,
        address: req.query.address,
      });
      return;
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term!',
    });
    return;
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'Shantanu Goyal',
    title: '404',
    error: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    name: 'Shantanu Goyal',
    title: '404',
    error: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});