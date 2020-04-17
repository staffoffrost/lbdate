const fs = require('fs')
const path = require('path')
const { getAllFilesFromDirectory, isPathExist, renameFile } = require('./file-system-extension')
const { getHash } = require('./hash-generator')
const { resolvePath, resolvePathsList, getDirName } = require('./path-extension')

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
  validatePathsExist(config)
  const allFiles = getAllFilesFromDirectory(config.rootFolder)
  for (const file of allFiles) {
    if (config.excludedFiles.some(x => x === file)) continue
    if (config.includedFiles.some(x => x === file)) {
      renameFile(file, hashFileName(file))
    } else if (config.excludedSubFolders.some(x => getDirName(file).includes(x) &&
      (config.includedSubFolders.every(y => !getDirName(file).includes(y)) ||
        config.includedSubFolders.some(y => getDirName(file).includes(y) &&
          x.length >= y.length)))
    ) {
      continue
    } else if (config.fileExtensions.some(x => file.endsWith(x))) {
      renameFile(file, hashFileName(file))
    }
  }
}

/**
 * @param {FileHasherConfig} config
 * @returns {FileHasherConfig}
 */
function prepareConfig(config) {
  config.rootFolder = resolvePath(config.rootFolder)
  config.excludedFiles = resolvePathsList(config.excludedFiles, config.rootFolder)
  config.includedFiles = resolvePathsList(config.includedFiles, config.rootFolder)
  config.excludedSubFolders = resolvePathsList(config.excludedSubFolders, config.rootFolder)
  config.includedSubFolders = resolvePathsList(config.includedSubFolders, config.rootFolder)
  return config
}

/**
 * @param {FileHasherConfig} config
 */
function validatePathsExist(config) {
  /** @type {string[]} */
  const allPaths = [
    config.rootFolder,
    config.excludedFiles,
    config.includedFiles,
    config.excludedSubFolders,
    config.includedSubFolders,
  ].flat()
  allPaths.forEach(resolvedPath => {
    if (!isPathExist(resolvedPath)) throw new Error(`Path: ${resolvedPath} doesn't exist.`)
  })
}

/**
 * @param {string} fileName
 * @returns {string}
 */
function hashFileName(fileName) {
  const fileExtension = path.extname(fileName)
  const pureFileName = path.basename(fileName, fileExtension)
  const directoryPath = path.dirname(fileName)
  const newPureFileName = `${pureFileName}.${getHash()}${fileExtension}`
  const newFileName = resolvePath(directoryPath, newPureFileName)
  return newFileName
}

module.exports = { hashFiles, hashFileName }
