const path = require('path')
const fs = require('fs')
const { getHash } = require('./hash-generator')
const { HASH_BLOCK } = require('./constants')
const { writeToFile, readFile } = require('./file-system-extension')
const { resolvePath } = require('./path-extension')

/**
 * @typedef ReplacementItem
 * @type {object}
 * @property {string} subStr
 * @property {string} newSubStr
 */

/**
 * @typedef FileStringReplacementSet
 * @type {object}
 * @property {string} filePath
 * @property {ReplacementItem[]} replacementsList
 */

/**
 * @param {FileStringReplacementSet[]} fileStringReplacementSets
 * @exported
 */
function replaceFileStrings(fileStringReplacementSets) {
  fileStringReplacementSets.forEach(config => {
    let fileStr = readFile(resolvePath(config.filePath))
    if (!fileStr) throw new Error(`This file is empty: ${config.filePath}`)
    fileStr = replaceStrings(fileStr, config.replacementsList, config.filePath)
    writeToFile(config.filePath, fileStr)
  })
}

/**
 * @param {string} fileString
 * @param {ReplacementItem[]} replacementItems
 * @param {string} filePath
 * @returns {string}
 */
function replaceStrings(fileString, replacementItems, filePath) {
  replacementItems.forEach(item => {
    if (!fileString.includes(item.subStr)) {
      throw new Error(`Cannot replace ${item.subStr} because it wasn't found in this file: ${filePath}.`)
    }
    if (item.newSubStr.includes(HASH_BLOCK)) {
      item.newSubStr = item.newSubStr.replace(HASH_BLOCK, getHash())
    }
    fileString = fileString.replace(item.subStr, item.newSubStr)
  })
  return fileString
}

module.exports = { replaceFileStrings }
