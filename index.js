const express = require('express')
const app = express()
const morgan = require('morgan')
const bParser = require('body-parser')
const cookieparser = require('cookie-parser')
const cors = require('cors');

const configuration = require('./config/configuration')
const logger = require('./root/logger')
const root = require('./src/controllers/common')

const port = configuration.port

morgan.token('m-type', function(req,res) {return req.method})
morgan.token('m-request', function(req,res) {return req.method=='POST'?JSON.stringify(req.body):JSON.stringify(req.query)})
morgan.token('m-url', function(req,res) {return req.protocol + '://' + req.get('host') + req.originalUrl})
morgan.token('m-status', function(req,res) {return res.statusCode})
app.use(morgan('Type\: :m-type -- Request\: :m-request -- URL\: :m-url -- Status\: :m-status -- Response Time\: :response-time ms', {stream: {write: message => logger.info(message)}}))

app.use(bParser.json())
app.use(bParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',configuration.header_options.origins)
    res.setHeader('Access-Control-Allow-Methods',configuration.header_options.methods)
    res.setHeader('Access-Control-Allow-Headers',configuration.header_options.headers)
    res.setHeader('Access-Control-Allow-Credentials',configuration.header_options.credentials)
    next()
});

app.use(cookieparser())

app.use(cors({ origin: 'http://localhost:3001' }));

app.use('/genai-explorations',root)

logger.info('Starting server...')
app.listen(port, () => {
    logger.info(`Listening to port ${port}`)
})