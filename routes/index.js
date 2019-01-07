// define the handlers object
const handlers = {}

// sample handler
handlers.ping = (data, cb) => {
  // Callback a http status code
  // eslint-disable-next-line standard/no-callback-literal
  cb(200)
}

// not found handler
handlers.notFound = (data, cb) => {
  // eslint-disable-next-line standard/no-callback-literal
  cb(404)
}

// define a request object
const router = {
  'api/v1/ping': handlers.ping
}

module.exports = {
  handlers,
  router
}
