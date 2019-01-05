/**
 * Create and export the configuration variables
 */

// create the env objects
const enviroments = {}

// deveploment env
enviroments.development = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'development'
}

// production env
enviroments.production = {
  httpPort: 5000,
  httpsPort: 3001,
  envName: 'production'
}

// determine which env was passed
const currentEnviroment = typeof (process.env.NODE_ENV) === 'string'
  ? process.env.NODE_ENV.toLowerCase()
  : ''

// check that the current env is one of the env above,
// if not, default to development
const setEnv = typeof (enviroments[currentEnviroment]) === 'object'
  ? enviroments[currentEnviroment]
  : enviroments.development

module.exports = setEnv
