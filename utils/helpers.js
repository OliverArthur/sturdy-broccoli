const crypto = require('crypto')
const config = require('../config')

// Container for all the helpers
const helpers = {}

// create a SHA256 hash
helpers.hash = str => {
  if (typeof (str) === 'string' && str.length > 0) {
    // Hash the string and returning
    const hash = crypto.createHmac('sha256', config.secret).update(str).digest('hex')
    return hash
  } else {
    return false
  }
}

module.exports = helpers