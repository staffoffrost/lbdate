const { resolvePath, resolvePathsList, getDirName } = require('./path-extension')
const { getAllFilesFromDirectory, readFile, writeToFile } = require('./file-system-extension')
const { hashFileName } = require('./file-hasher')

/**
 * @typedef BannerSet
 * @type {object}
 * @property {string} fileType
 * @property {string} banner
 */

/**
 * @typedef BannerAdderConfig
 * @type {object}
 * @property {string} rootFolder
 * @property {boolean} isSeparateRow
 * @property {BannerSet[]} banners
 * @property {string[]} excludedFiles
 * @property {string[]} excludedSubFolders
 * @property {string[]} includedSubFolders
 */

/**
 * @param {BannerAdderConfig} config
 */
function addBanners(config) {
  config = prepareConfig(config)
  const filteredFiles = getAllFilesFromDirectory(config.rootFolder).filter(file => {
    if (config.excludedFiles.some(x => file === x ||
      file === hashFileName(x))
    ) {
      return false
    }
    if (config.excludedSubFolders.some(x => getDirName(file).includes(x) &&
      config.includedSubFolders.every(y => !getDirName(file).includes(y)) ||
      (config.includedSubFolders.some(y => getDirName(file).includes(y) &&
        x.length >= y.length)))
    ) {
      return false
    }
    return true
  })
  filteredFiles.forEach(file => {
    const bannerSet = config.banners.find(x => file.endsWith(x.fileType))
    if (bannerSet) {
      const banner = bannerSet.banner
      let rawFile = readFile(file)
      rawFile = `${banner}${config.isSeparateRow ? '\n' : ''}${rawFile}`
      writeToFile(file, rawFile)
    }
  })
}

/**
 * @param {BannerAdderConfig} config
 * @returns {BannerAdderConfig}
 */
function prepareConfig(config) {
  config.rootFolder = resolvePath(config.rootFolder)
  config.excludedFiles = resolvePathsList(config.excludedFiles, config.rootFolder)
  config.excludedSubFolders = resolvePathsList(config.excludedSubFolders, config.rootFolder)
  config.includedSubFolders = resolvePathsList(config.includedSubFolders, config.rootFolder)
  return config
}

module.exports = { addBanners }
