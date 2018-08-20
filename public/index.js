const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const app = express()

//--- Components collection
const config = require('../config/config')
const site = require('../components/site')
const test = require('../components/test')
//--- Components collection

//--- App configuration
app.set('trust proxy', 1)
app.disable('x-powered-by')
//--- App configuration

//--- App middlewares
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
  name: config.session.name,
  keys: config.session.secret,
  cookie: {
    secure: config.session.secure,
    httpOnly: config.session.httpOnly,
    domain: config.session.domain,
    path: config.session.path,
    expires: config.session.expires
  }
}))
//--- App middlewares

//--- Routes collection
app.get('/', site.index)
app.get('/error', site.error)
app.use('/test', test) // Route group example
//--- Routes collection

//--- Error handler
app.use(site.notFoundHandler)
app.use(site.errorHandler)
//--- Error handler

app.listen(3000, () => console.log('App listening on port 3000!'))
