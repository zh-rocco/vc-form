const APP_NAME = require('./package.json').name

const NODE_ENV = process.env.NODE_ENV || 'development'

log('APP_NAME: ', APP_NAME)
log('NODE_ENV: ', NODE_ENV)

module.exports = {
  publicPath: './'
}

function log (label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content)
}
