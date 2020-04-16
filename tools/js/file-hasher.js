const fs = require('fs')
const path = require('path')
const { getAllFilesFromDirectory } = require('./file-system-extension')

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
  const rootDir = path.resolve(config.rootFolder)
  const allFiles = getAllFilesFromDirectory(rootDir)
  console.log(allFiles)
}

module.exports = { hashFiles }
