
/**
 * @returns {value is Error}
 */
function isError(value) {
  return value instanceof Error
}

module.exports = { isError }
