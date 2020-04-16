const path = require('path')
const { getJsonFromFile, logError, logSuccess, replaceFileStrings, verifyHashing, SETTINGS_FOLDER, POST_PG_BUILD_STRING_REPLACER_CONFIG_PATH, POST_PG_BUILD_FILE_HASHER_CONFIG_PATH, hashFiles, POST_PG_BUILD_HASH_VERIFIER_CONFIG_PATH } = require('../js')

main()
function main() {
  try {
    fileStringsReplacementProcedure()
    hashFilesInDist()
    verifyHashingInDist()
  } catch (e) {
    logError(e)
    process.exit(1)
  }
  logSuccess('Post build procedure')
  process.exit(0)
}

function fileStringsReplacementProcedure() {
  const stringReplacerConfigPath = path.resolve(SETTINGS_FOLDER, POST_PG_BUILD_STRING_REPLACER_CONFIG_PATH)
  /** @type {import('../js/html-string-replacer').FileStringReplacementSet[]} */
  const stringReplacerConfig = getJsonFromFile(stringReplacerConfigPath)
  replaceFileStrings(stringReplacerConfig)
}

function hashFilesInDist() {
  const fileHasherConfigPath = path.resolve(SETTINGS_FOLDER, POST_PG_BUILD_FILE_HASHER_CONFIG_PATH)
  /** @type {import('../js/file-hasher').FileHasherConfig} */
  const fileHasherConfig = getJsonFromFile(fileHasherConfigPath)
  hashFiles(fileHasherConfig)
}

function verifyHashingInDist() {
  const hashingVerifierConfigPath = path.resolve(SETTINGS_FOLDER, POST_PG_BUILD_HASH_VERIFIER_CONFIG_PATH)
  /** @type {import('../js/file-hasher').HashVerifierConfig} */
  const hashingVerifierConfig = getJsonFromFile(hashingVerifierConfigPath)
  verifyHashing(hashingVerifierConfig)
}
