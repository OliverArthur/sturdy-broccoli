/* eslint-disable standard/no-callback-literal */
// define the handlers object
const handlers = {}

// user handler
handlers.user = (data, cb) => {
  const allowMethods = ['post', 'get', 'put', 'delete']

  if (allowMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, cb)
  } else {
    cb(405)
  }
}

// ping handler
handlers.ping = (data, cb) => {
  // Callback a http status code
  cb(200)
}

// not found handler
handlers.notFound = (data, cb) => {
  cb(404)
}

module.exports = handlers
