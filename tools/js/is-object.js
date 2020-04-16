
/**
 * @returns {value is object}
 * @exported
 */
function isObject(value) {
  return value && typeof value == 'object'
}

module.exports = { isObject }
