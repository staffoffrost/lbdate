const register = require('@babel/register')

const BABEL_DEFAULT_CONFIG = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: [
          './'
        ],
        alias: {}
      }
    ]
  ]
}

/**
 * @param {{}} config
 */
function registerBabel(config) {
  register(config || BABEL_DEFAULT_CONFIG)
}

module.exports = { registerBabel }
