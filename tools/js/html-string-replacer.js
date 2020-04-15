const path = require('path')
const fs = require('fs')
const { getHash } = require('./hash-generator')

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

const HASH_BLOCK = '[hash]'
const UTF8 = 'utf8'

/**
 * @param {FileStringReplacementSet[]} fileStringReplacementSets
 * @exported
 */
function replaceFileStrings(fileStringReplacementSets) {
  fileStringReplacementSets.forEach(config => {
    let fileStr = getStringFromFile(config.filePath)
    if (!fileStr) throw new Error(`This file is empty: ${config.filePath}`)
    fileStr = replaceStrings(fileStr, config.replacementsList, config.filePath)
    writeStringToFile(config.filePath, fileStr)
  })
}

/**
 * @param {string} filePath
 * @returns {string}
 */
function getStringFromFile(filePath) {
  filePath = path.resolve(filePath)
  return fs.readFileSync(filePath, UTF8)
}

/**
 * @param {string} filePath
 * @param {string} str
 */
function writeStringToFile(filePath, str) {
  fs.writeFileSync(filePath, str, UTF8)
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
