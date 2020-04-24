import { POST_SRC_BUILD_CONFIG } from '../configs/post-src-build-config'
import { copyFilesList, resolvePath, resolvePathsList } from '../extensions'
import { Provider } from '../provider'
import handlePkgJsonFiles from './handle-pkg-json-files'
import handleVersionIncrement from './handle-version-increment'

export default async function main(): Promise<void> {
  const logger = Provider.getLoggerHandler()
  setConfiguration()
  await handleVersionIncrement()
  copyFiles()
  await handlePkgJsonFiles()
  logger.logSuccess('Post SRC build')
}

function setConfiguration(): void {
  const config = Provider.getPostSrcBuildConfigHandler()
  config.config = POST_SRC_BUILD_CONFIG
  const logger = Provider.getLoggerHandler()
  logger.config = POST_SRC_BUILD_CONFIG.logger
}

function copyFiles(): void {
  const config = Provider.getPostSrcBuildConfigHandler().config
  config.buildFolder = resolvePath(config.rootFolder, config.buildFolder)
  config.filesToCopy = resolvePathsList(config.filesToCopy, config.rootFolder)
  copyFilesList(config.filesToCopy, config.buildFolder)
}
