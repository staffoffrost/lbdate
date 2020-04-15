const { AppError } = require('./app-error')
const { isString } = require('./is-string')
const { isError } = require('./is-error')

/**
 * @param {AppError | Error | string} e
 * @exported
 */
function logError(e) {
  logErrorValue('ERROR!!!')
  if (e instanceof AppError) {
    logErrorValue(e)
    if (e.innerError) logError(e.innerError)
  } else if (isString(e) || isError(e)) {
    logErrorValue(e)
  } else {
    throw new Error('The provided error is not supported.')
  }
  addEmptyLine()
}

/**
 * @param {AppError | Error | string} value
 */
function logErrorValue(value) {
  console.error("\x1b[31m", value, "\x1b[0m")
}

function addEmptyLine() {
  console.log()
}

/**
 * @param {string} msg
 * @param {boolean} isFullMsg
 * @default
 * isFullMsg = false
 * @exported
 */
function logSuccess(msg, isFullMsg = false) {
  addEmptyLine()
  if (isFullMsg) {
    console.log("\x1b[32m", msg, "\x1b[0m")
  } else {
    console.log("\x1b[32m", `${msg} was successful.`, "\x1b[0m")
  }
  addEmptyLine()
}

module.exports = { logError, logSuccess }
