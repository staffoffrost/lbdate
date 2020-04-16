
/**
 * @typedef HashingSet
 * @type {object}
 * @property {string} hashedFile
 * @property {string} callerFile
 */

/**
 * @typedef HashVerifierConfig
 * @type {object}
 * @property {string} rootFolder
 * @property {string[]} excludedSubFolders
 * @property {HashingSet[]} hashingSets
 */

/**
 * @exported
 */
function verifyHashing(config) {
  console.log(config)
}

module.exports = { verifyHashing }
