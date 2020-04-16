const fs = require('fs')
const path = require('path')

/**
 * @param {string} rootFolder
 * @returns {string[]} returns sub files.
 * @exported
 */
function getAllFilesFromDirectory(rootFolder) {
  rootFolder = path.resolve(rootFolder)
  let allFolders = [rootFolder]
  allFolders = allFolders.concat(getAllFoldersFromDirectory(rootFolder))
  /** @type {string[]} */
  let allFiles = []
  allFolders.forEach(folder => {
    const partialPaths = fs.readdirSync(folder)
    const resolvedPaths = partialPaths.map(partialPath => path.resolve(folder, partialPath))
    allFiles = allFiles.concat(resolvedPaths.filter(resolvedPath => isFile(resolvedPath)))
  })
  return allFiles
}

/**
 * @param {string} rootFolder
 * @returns {string[]} returns sub directories.
 * @exported
 */
function getAllFoldersFromDirectory(rootFolder) {
  const partialPaths = fs.readdirSync(rootFolder)
  /** @type {string[]} */
  let dirs = []
  partialPaths.forEach(partialPAth => {
    const resolvedPath = path.resolve(rootFolder, partialPAth)
    if (isDirectory(resolvedPath)) {
      dirs.push(resolvedPath)
      dirs = dirs.concat(getAllFoldersFromDirectory(resolvedPath))
    }
  })
  return dirs
}

/**
 * @param {string} path
 * @returns {boolean}
 */
function isDirectory(path) {
  return fs.statSync(path).isDirectory()
}

/**
 * @param {string} path
 * @returns {boolean}
 */
function isFile(path) {
  return fs.statSync(path).isFile()
}

module.exports = { getAllFilesFromDirectory, getAllFoldersFromDirectory, isDirectory, isFile }
