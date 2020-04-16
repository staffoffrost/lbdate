
/**
 * @returns {value is Error}
 * @exported
 */
function isError(value) {
  return value instanceof Error
}

module.exports = { isError }
