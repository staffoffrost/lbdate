const register = require('@babel/register')
const { BABEL_DEFAULT_CONFIG } = require('./constants')

/**
 * @param {{}} config
 * @exported
 */
function registerBabel(config) {
  register(config || BABEL_DEFAULT_CONFIG)
}

module.exports = { registerBabel }
