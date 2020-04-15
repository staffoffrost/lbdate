const fs = require('fs')

/**
 * @param {string} filePath
 * @returns {{}}
 * @exported
 */
function getJsonFromFile(filePath) {
  const rawFileData = fs.readFileSync(filePath)
  const jsonFileData = JSON.parse(rawFileData)
  if (typeof jsonFileData == 'object') return jsonFileData
  throw new Error(`Couldn't parse Json data from file: ${filePath}`)
}

module.exports = { getJsonFromFile }
