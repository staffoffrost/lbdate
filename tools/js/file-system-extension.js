const fs = require('fs')
const path = require('path')
const { isString } = require('./is-string')
const { ENCODING } = require('./constants')

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
 * @param {string} resolvedPath
 * @returns {boolean}
 */
function isDirectory(resolvedPath) {
  return fs.statSync(resolvedPath).isDirectory()
}

/**
 * @param {string} resolvedPath
 * @returns {boolean}
 */
function isFile(resolvedPath) {
  return fs.statSync(resolvedPath).isFile()
}

/**
 * @param {string} resolvedPath
 * @returns {boolean}
 */
function isPathExist(resolvedPath) {
  return fs.existsSync(resolvedPath)
}

/**
 * @param {string} fileName
 * @param {string} newFileName
 */
function renameFile(fileName, newFileName) {
  fs.renameSync(fileName, newFileName)
}

/**
 * @param {string} filePath
 * @returns {string}
 */
function readFile(filePath) {
  const str = fs.readFileSync(filePath, ENCODING)
  if (!isString(str)) throw new Error(`Can't read file: "${filePath}" as a string.`)
  return str
}

module.exports = { getAllFilesFromDirectory, getAllFoldersFromDirectory, isDirectory, isFile, isPathExist, renameFile, readFile }
