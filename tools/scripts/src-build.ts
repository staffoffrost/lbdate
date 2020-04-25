import { SRC_BUILD_CONFIG } from '../configs/src-build-config'
import { LoggerHandler } from '../handlers'
import { copyFiles } from '../handlers/files-copy.handler'
import { Provider } from '../provider'

export default async function main(): Promise<void> {
  const logger = Provider.getLoggerHandler()
  setConfiguration(logger)
  const copyConfig = Provider.getPostSrcBuildConfigHandler().config.filesToCopy
  copyFiles(copyConfig)
  logger.logSuccess('SRC build')
}

function setConfiguration(logger: LoggerHandler): void {
  const config = Provider.getSrcBuildConfigHandler()
  config.config = SRC_BUILD_CONFIG
  logger.config = SRC_BUILD_CONFIG.logger
}
