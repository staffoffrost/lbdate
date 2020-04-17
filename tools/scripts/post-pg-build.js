const path = require('path')
const { exec } = require('child_process')
const { getJsonFromFile, logError, logSuccess, replaceFileStrings, verifyHashing, SETTINGS_FOLDER, POST_PG_BUILD_STRING_REPLACER_CONFIG_PATH, POST_PG_BUILD_FILE_HASHER_CONFIG_PATH, hashFiles, POST_PG_BUILD_HASH_VERIFIER_CONFIG_PATH } = require('../js')

main()
async function main() {
  try {
    fileStringsReplacementProcedure()
    hashFilesInDist()
    verifyHashingInDist()
    await runMinifyHtml()
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

/**
 * @returns {Promise<void>}
 */
function runMinifyHtml() {
  const command = 'html-minifier dist/index.html --collapse-whitespace --minify-js --minify-css -o dist/index.html'
  return new Promise((resolve, reject) => {
    exec(command, error => {
      error ? reject(error) : resolve()
    })
  })
}
