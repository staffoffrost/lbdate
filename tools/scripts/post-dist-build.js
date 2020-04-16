const path = require('path')
const { getJsonFromFile, logError, logSuccess, replaceFileStrings, SETTINGS_FOLDER, POST_DIST_BUILD_STRING_REPLACER_CONFIG_PATH, POST_DIST_BUILD_FILE_HASHER_CONFIG_PATH, hashFiles } = require('../js')

main()
function main() {
  try {
    fileStringsReplacementProcedure()
    hashFilesInDist()
  } catch (e) {
    logError(e)
    process.exit(1)
  }
  logSuccess('Post build procedure')
  process.exit(0)
}

function fileStringsReplacementProcedure() {
  const stringReplacerConfigPath = path.resolve(SETTINGS_FOLDER, POST_DIST_BUILD_STRING_REPLACER_CONFIG_PATH)
  /** @type {import('../js/html-string-replacer').FileStringReplacementSet[]} */
  const stringReplacerConfig = getJsonFromFile(stringReplacerConfigPath)
  replaceFileStrings(stringReplacerConfig)
}

function hashFilesInDist() {
  const fileHasherConfigPath = path.resolve(SETTINGS_FOLDER, POST_DIST_BUILD_FILE_HASHER_CONFIG_PATH)
  /** @type {import('../js/file-hasher').FileHasherConfig]} */
  const fileHasherConfig = getJsonFromFile(fileHasherConfigPath)
  hashFiles(fileHasherConfig)
}
