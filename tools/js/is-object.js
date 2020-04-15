
/**
 * @returns {value is object}
 */
function isObject(value) {
  return value && typeof value == 'object'
}

module.exports = { isObject }
