/* eslint-disable standard/no-callback-literal */
// dependecies
const _data = require('./data')
const helpers = require('../utils/helpers')

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

// Container for the users submethods
handlers._users = {}

// Users - posts
// Required data: firstname, lastname, phone, password, tosAgrement
// optional data: false
handlers._users.post = (data, cb) => {
  // check all the required fields
  const firstname = typeof (data.payload.firstname) === 'string' && data.payload.firstname.trim().length > 0
    ? data.payload.firstname.trim()
    : false

  const lastname = typeof (data.payload.lastname) === 'string' && data.payload.lastname.trim().length > 0
    ? data.payload.lastname.trim()
    : false

  const phone = typeof (data.payload.phone) === 'string' && data.payload.phone.trim().length === 10
    ? data.payload.phone.trim()
    : false

  const password = typeof (data.payload.password) === 'string' && data.payload.password.trim().length > 0
    ? data.payload.password.trim()
    : false
  const hashPassword = helpers.hash(password)

  const tosAgrement = !!(typeof (data.payload.tosAgrement) === 'boolean' && data.payload.tosAgrement === true)

  // create user object
  const user = {
    firstname,
    lastname,
    phone,
    hashPassword,
    tosAgrement
  }

  if (!user) {
    throw Error(400, { 'Error': 'Missing required fields' })
  }
  // Check is the user doesnt already exist
  _data.read('users', phone, (err, data) => {
    if (err) {
      throw Error(400, { 'Error': 'A user with that phone number already exist' })
    }
    // store the user
    _data.create('users', phone, user, err => {
      if (!err) {
        cb(200)
      } else {
        throw Error(500, { 'Error': 'Could not create the new user' })
      }
    })
  })
}
// Users - get
handlers._users.get = (data, cb) => {}
// Users - put
handlers._users.put = (data, cb) => {}
// Users - delete
handlers._users.delete = (data, cb) => {}

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
