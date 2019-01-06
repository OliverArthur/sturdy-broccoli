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

module.exports = {
  handlers,
  router
}
