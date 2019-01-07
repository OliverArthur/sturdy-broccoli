// dependecies
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const handlers = require('./handlers')
const router = require('./router')

/**
 * @class Server
 */
class Server {
  static init (req, res) {
    // get the url and parse it
    const parseUrl = url.parse(req.url, true)

    // get the path
    const path = parseUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')

    // get the query string as an object
    const queryStringObject = parseUrl.query

    // get the http method
    const method = req.method.toLowerCase()

    // get the headers as an object
    const headers = req.headers

    // get the payload
    const decoder = new StringDecoder('utf-8')
    let buffer = ''

    req.on('data', data => {
      buffer += decoder.write(data)
    })

    req.on('end', () => {
      buffer += decoder.end()

      // choose the handler the request should go, if one is not found
      // use the notFound handler
      const handler = typeof (router[trimmedPath]) !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound

      // construct the data object to send
      // to the handler
      const data = {
        trimmedPath,
        queryStringObject,
        method,
        headers,
        payload: buffer
      }

      // route the request to the handler specified in the router
      handler(data, (statusCode, payload) => {
        // use the status code called by the handler,
        // or default to 200
        statusCode = typeof (statusCode) === 'number' ? statusCode : 200

        // use the status code called by the handler,
        // or default to empty object
        payload = typeof (payload) === 'object' ? payload : {}

        // Convert the payload to a string
        const payloadString = JSON.stringify(payload)

        // return the response
        res.setHeader('Content-Type', 'application/json')
        res.writeHead(statusCode)
        res.end(payloadString)
      })
    })
  }
}

module.exports = Server
