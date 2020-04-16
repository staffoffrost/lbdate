const path = require('path')
const { getJsonFromFile } = require('./get-json-from-file')
const { PACKAGE_JSON_FILE_NAME } = require('./constants')

/** @type {?string} */
let appVersion = null

/**
 * @returns {string}
 * @exported
 */
function getAppVersion() {
  if (!appVersion) {
    const packageJsonPath = path.resolve(PACKAGE_JSON_FILE_NAME)
    const packageJsonData = getJsonFromFile(packageJsonPath)
    if (!packageJsonData || !packageJsonData.version) {
      throw new Error(`Can't get app's version from ${PACKAGE_JSON_FILE_NAME} file.`)
    }
    appVersion = packageJsonData.name
  }
  return appVersion
}

module.exports = { getAppVersion }
