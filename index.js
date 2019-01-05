/**
 * Primary file
 */

// dependecies
const fs = require('fs')
const http = require('http')
const https = require('https')

const config = require('./config')
const server = require('./server')

// instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
  server.init(req, res, router, handlers)
})

// Start the HTTP server
httpServer.listen(config.httpPort, () => {
  console.log(`The server listeninig on port ${config.httpPort}`)
})

// instantiate the HTTP server
const options = {
  key: fs.readFileSync('./certificates/key.pem'),
  cert: fs.readFileSync('./certificates/cert.pem')
}

const httpsServer = https.createServer(options, (req, res) => {
  server.init(req, res, router, handlers)
})

// Start the HTTP server
httpsServer.listen(config.httpsPort, () => {
  console.log(`The server listeninig on port ${config.httpsPort}`)
})

// define the handlers object
const handlers = {}

// sample handler
handlers.sample = (data, cb) => {
  // Callback a http status code, and a payload object
  // eslint-disable-next-line standard/no-callback-literal
  cb(406, { name: 'sample handler' })
}

// not found handler
handlers.notFound = (data, cb) => {
  // eslint-disable-next-line standard/no-callback-literal
  cb(404)
}

// define a request object
const router = {
  'sample': handlers.sample
}
