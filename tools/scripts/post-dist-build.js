const path = require('path')
const { getJsonFromFile, logError, logSuccess, replaceFileStrings } = require('../js')

const SETTINGS_FOLDER = 'tools/configurations'
const POST_DIST_BUILD_STRING_REPLACER_CONFIG_PATH = 'post-dist-build-string-replacer.json'

main()
function main() {
  try {
    fileStringsReplacementProcedure()
  } catch (e) {
    logError(e)
    process.exit(1)
  }
  logSuccess('Post dist procedure')
  process.exit(0)
}

function fileStringsReplacementProcedure() {
  const stringReplacerConfigPath = path.resolve(SETTINGS_FOLDER, POST_DIST_BUILD_STRING_REPLACER_CONFIG_PATH)
  /** @type {import('../js/html-string-replacer').FileStringReplacementSet[]} */
  const stringReplacerConfig = getJsonFromFile(stringReplacerConfigPath)
  replaceFileStrings(stringReplacerConfig)
}
