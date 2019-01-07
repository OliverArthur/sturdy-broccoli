/**
 * Primary file
 */

// dependecies
const fs = require('fs')
const http = require('http')
const https = require('https')

const config = require('./config')
const server = require('./lib/server')

// instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
  server.init(req, res)
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
  server.init(req, res)
})

// Start the HTTPS server
httpsServer.listen(config.httpsPort, () => {
  console.log(`The server listeninig on port ${config.httpsPort}`)
})
