import { POST_SRC_BUILD_CONFIG } from '../configs/post-src-build-config'
import { LoggerHandler } from '../handlers'
import { copyFiles } from '../handlers/files-copy.handler'
import { Provider } from '../provider'
import handlePkgJsonFiles from './handle-pkg-json-files'
import handleVersionIncrement from './handle-version-increment'

export default async function main(): Promise<void> {
  const logger = Provider.getLoggerHandler()
  setConfiguration(logger)
  await handleVersionIncrement()
  const copyConfig = Provider.getPostSrcBuildConfigHandler().config.filesToCopy
  copyFiles(copyConfig)
  await handlePkgJsonFiles()
  logger.logSuccess('Post SRC build')
}

function setConfiguration(logger: LoggerHandler): void {
  const config = Provider.getPostSrcBuildConfigHandler()
  config.config = POST_SRC_BUILD_CONFIG
  logger.config = POST_SRC_BUILD_CONFIG.logger
}
