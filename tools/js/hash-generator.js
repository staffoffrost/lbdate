const { getRndInteger } = require('./get-random-int')
const { HASH_LENGTH, HASH_CHAR_POOL } = require('./constants')

/** @type {?string} */
let hash = null

/**
 * @returns {string}
 * @exported
 */
function getHash() {
  if (!hash) hash = generateHash()
  return hash
}

/**
 * @returns {string}
 */
function generateHash() {
  let localHash = ''
  for (let i = 0; i < HASH_LENGTH; i++) {
    const charIndex = getRndInteger(0, HASH_CHAR_POOL.length - 1)
    localHash += HASH_CHAR_POOL[charIndex]
  }
  return localHash
}

module.exports = { getHash }
