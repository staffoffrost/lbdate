const { isString } = require('./is-string')
const { isError } = require('./is-error')

class AppError extends Error {
  /**
   * @type {AppError | Error}
   */
  innerError = null

  /**
   * @param {AppError | Error | string} msgOrError
   * @param {string} msg
   */
  constructor(msgOrError, msg) {
    super(isString(msg) ? msg : isString(msgOrError) ? msgOrError : undefined)
    if (isError(msgOrError)) this.innerError = msgOrError
  }
}

module.exports = { AppError }
