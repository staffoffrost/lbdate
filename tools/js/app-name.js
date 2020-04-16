const path = require('path')
const { getJsonFromFile } = require('./get-json-from-file')
const { PACKAGE_JSON_FILE_NAME } = require('./constants')

/** @type {?string} */
let appName = null

/**
 * @returns {string}
 * @exported
 */
function getAppName() {
  if (!appName) {
    const packageJsonPath = path.resolve(PACKAGE_JSON_FILE_NAME)
    const packageJsonData = getJsonFromFile(packageJsonPath)
    if (!packageJsonData || !packageJsonData.name) {
      throw new Error(`Can't get app's name from ${PACKAGE_JSON_FILE_NAME} file.`)
    }
    appName = packageJsonData.name
  }
  return appName
}

module.exports = { getAppName }
