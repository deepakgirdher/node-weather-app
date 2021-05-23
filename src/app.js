const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { send } = require('process')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'The Weather App',
    name: 'DG'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'DG'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is help message',
    title: 'Help',
    name: 'DG'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send('Please provide an address')
  }

  geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: 'Location not found'
      })
    }
    forecast(latitude, longitude, (error, { temp, desc }) => {
      if (error) {
        return send({
          error: 'Not able to find the weather details.'
        })
      }
      res.send({
        location: location,
        temp: temp,
        description: desc
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Article not found',
    title: '404',
    name: 'DG'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'DG'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})