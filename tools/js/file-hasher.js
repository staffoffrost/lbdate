const fs = require('fs')
const path = require('path')
const { getAllFilesFromDirectory } = require('./file-system-extension')
const { getHash } = require('./hash-generator')
const { resolvePath, resolvePathsList } = require('./path-extension')

/**
 * @typedef FileHasherConfig
 * @type {object}
 * @property {string} rootFolder
 * @property {string[]} fileExtensions
 * @property {string[]} excludedFiles
 * @property {string[]} includedFiles
 * @property {string[]} excludedSubFolders
 * @property {string[]} includedSubFolders
 */

/**
 * @param {FileHasherConfig} config
 * @exported
 */
function hashFiles(config) {
  config = prepareConfig(config)
  const rootDir = resolvePath(config.rootFolder)
  const allFiles = getAllFilesFromDirectory(rootDir)
  for (const file of allFiles) {
    if (config.excludedFiles.some(x => x === file)) continue
    if (config.includedFiles.some(x => x === file)) {
      hashFileName(file)
    } else if (config.excludedSubFolders.some(x => file.includes(x) &&
      (config.includedSubFolders.every(y => !file.includes(y)) ||
        config.includedSubFolders.some(y => file.includes(y) &&
          x.length >= y.length)))
    ) {
      continue
    } else if (config.fileExtensions.some(x => file.endsWith(x))) {
      hashFileName(file)
    }
  }
}

/**
 * @param {FileHasherConfig} config
 * @returns {FileHasherConfig}
 */
function prepareConfig(config) {
  config.excludedFiles = resolvePathsList(config.excludedFiles, config.rootFolder)
  config.includedFiles = resolvePathsList(config.includedFiles, config.rootFolder)
  config.excludedSubFolders = resolvePathsList(config.excludedSubFolders, config.rootFolder)
  config.includedSubFolders = resolvePathsList(config.includedSubFolders, config.rootFolder)
  return config
}

/**
 * @param {string} fileName
 */
function hashFileName(fileName) {
  const fileExtension = path.extname(fileName)
  const pureFileName = path.basename(fileName, fileExtension)
  const directoryPath = path.dirname(fileName)
  const newPureFileName = `${pureFileName}.${getHash()}${fileExtension}`
  const newFileName = resolvePath(directoryPath, newPureFileName)
  fs.renameSync(fileName, newFileName)
}

module.exports = { hashFiles }
