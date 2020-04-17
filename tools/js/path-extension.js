const path = require('path')

/**
 * @param {string[]} pathSegments
 * @returns {string}
 * @exported
 */
function resolvePath(...pathSegments) {
  return path.resolve(...pathSegments)
}

/**
 * @param {string[]} pathsList
 * @param {?string} rootFolder
 * @exported
 */
function resolvePathsList(pathsList, rootFolder = null) {
  if (rootFolder !== null) {
    return pathsList.map(unresolvedPath => resolvePath(rootFolder, unresolvedPath))
  } else {
    return pathsList.map(unresolvedPath => resolvePath(unresolvedPath))
  }
}

/**
 * @param {string} filePath
 * @returns {string}
 */
function getDirName(filePath) {
  return path.dirname(filePath)
}

module.exports = { resolvePath, resolvePathsList, getDirName }
