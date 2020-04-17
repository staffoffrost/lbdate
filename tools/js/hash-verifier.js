const { resolvePath, resolvePathsList } = require('./path-extension')
const { getAllFilesFromDirectory, isPathExist, readFile } = require('./file-system-extension')
const { hashFileName } = require('./file-hasher')
const { getHash } = require('./hash-generator')

/**
 * @typedef HashingSet
 * @type {object}
 * @property {string} hashedFile
 * @property {string} initiatorFile
 */

/**
 * @typedef HashVerifierConfig
 * @type {object}
 * @property {string} rootFolder
 * @property {string} indexHtml
 * @property {string[]} excludedFiles
 * @property {string[]} excludedSubFolders
 * @property {HashingSet[]} hashingSets
 * @property {boolean} errorNonHashedFiles
 * @property {string[]} extensionForNonHashedFilesValidation
 */

/**
 * @param {HashVerifierConfig} config
 * @exported
 */
function verifyHashing(config) {
  config = prepareConfig(config)
  validatePathsExist(config)
  const hash = getHash()
  config.hashingSets.forEach(set => {
    if (isPathExist(set.hashedFile)) throw new Error(`File: "${set.hashedFile}" is not hashed.`)
    const rawFile = readFile(set.initiatorFile)
    const hashedFile = hashFileName(set.hashedFile)
      .split(config.rootFolder)[1]
      .substring(1)
      .replace(/\\/g, '/')
    if (!rawFile.includes(hashedFile)) throw new Error(`Initiator file: "${set.initiatorFile}" does not include "${hashedFile}".`)
  })
  const filteredFiles = getAllFilesFromDirectory(config.rootFolder)
    .filter(x => x.includes(hash) &&
      (x.endsWith('.js') || x.endsWith('.css')) &&
      !config.excludedFiles.some(y => y === x ||
        (!y.includes(hash) &&
          hashFileName(y) === x)) &&
      !config.excludedSubFolders.some(y => x.includes(y)))
  for (const file of filteredFiles) {
    if (!file.includes(hash)) continue
    const rawHtmlFile = readFile(config.indexHtml)
    const hashedFile = file.split(config.rootFolder)[1]
      .substring(1)
      .replace(/\\/g, '/')
    if (!rawHtmlFile.includes(hashedFile)) throw new Error(`Html file: "${config.indexHtml}" doesn't include "${hashedFile}"`)
  }
}

/**
 * @param {HashVerifierConfig} config
 * @returns {HashVerifierConfig}
 */
function prepareConfig(config) {
  config.rootFolder = resolvePath(config.rootFolder)
  config.indexHtml = resolvePath(config.rootFolder, config.indexHtml)
  config.excludedFiles = resolvePathsList(config.excludedFiles, config.rootFolder)
  config.excludedSubFolders = resolvePathsList(config.excludedSubFolders, config.rootFolder)
  config.hashingSets = config.hashingSets.map(set => ({
    hashedFile: resolvePath(config.rootFolder, set.hashedFile),
    initiatorFile: resolvePath(config.rootFolder, set.initiatorFile),
  }))
  return config
}

/**
 * @param {HashVerifierConfig} config
 */
function validatePathsExist(config) {
  /** @type {string[]} */
  const allFolderPaths = [
    config.rootFolder,
    config.excludedSubFolders,
  ].flat()
  /** @type {string[]} */
  const allFilePaths = [
    config.indexHtml,
    config.excludedFiles,
    config.hashingSets.map(set => Object.values(set)),
  ].flat(Infinity)
  allFolderPaths.forEach(folderPath => {
    if (!isPathExist(folderPath)) new Error(`Folder: "${folderPath}" doesn't exist.`)
  })
  allFilePaths.forEach(filePath => {
    if (!isPathExist(filePath) &&
      !isPathExist(hashFileName(filePath))
    ) {
      throw new Error(`File: "${filePath}" doesn't exist.`)
    }
  })
  if (!config.errorNonHashedFiles) return
  const allFiles = getAllFilesFromDirectory(config.rootFolder)
  allFiles.forEach(file => {
    if ((config.extensionForNonHashedFilesValidation &&
      config.extensionForNonHashedFilesValidation.length &&
      config.extensionForNonHashedFilesValidation.some(x => file.endsWith(x)) &&
      !file.includes(getHash())) ||
      ((!config.extensionForNonHashedFilesValidation ||
        !config.extensionForNonHashedFilesValidation.length) &&
        !file.includes(getHash()))
    ) {
      throw new Error(`File: "${file}" isn't hashed.`)
    }
  })
}

module.exports = { verifyHashing }
