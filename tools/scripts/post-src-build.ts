import { POST_SRC_BUILD_CONFIG } from '../configs/post-src-build-config'
import { Factory } from '../factory'
import { LoggerHandler } from '../handlers'
import { Provider } from '../provider'
import handlePkgJsonFiles from './handle-pkg-json-files'
import handleVersionIncrement from './handle-version-increment'

export default async function main(): Promise<void> {
  const logger = Provider.getLoggerHandler()
  setConfiguration(logger)
  await handleVersionIncrement()
  copyFiles()
  await handlePkgJsonFiles()
  logger.logSuccess('Post SRC build')
}

function setConfiguration(logger: LoggerHandler): void {
  const config = Provider.getPostSrcBuildConfigHandler()
  config.config = POST_SRC_BUILD_CONFIG
  logger.config = POST_SRC_BUILD_CONFIG.logger
}

function copyFiles(): void {
  const config = Provider.getPostSrcBuildConfigHandler().config.filesToCopy
  const copyHandler = Factory.createFilesCopyHandler()
  copyHandler.copyFiles(config)
}
