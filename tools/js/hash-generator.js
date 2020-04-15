const { getRndInteger } = require('./get-random-int')

const HASH_LENGTH = 20
const CHAR_POOL = 'abcdefghijklmnopqrstvuwxyzABCDEFGHIJKLMNOPQRSTVUWXYZ0123456789'

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
    const charIndex = getRndInteger(0, CHAR_POOL.length - 1)
    localHash += CHAR_POOL[charIndex]
  }
  return localHash
}

module.exports = { getHash }
