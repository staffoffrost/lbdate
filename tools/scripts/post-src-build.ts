import { copyFiles } from '../handlers/files-copy.handler'
import { Provider } from '../provider'
import handlePkgJsonFiles from './handle-pkg-json-files'
import handleVersionIncrement from './handle-version-increment'

export default async function main(): Promise<void> {
  const config = Provider.getPostSrcBuildConfigHandler().config
  const logger = Provider.getLoggerHandler()
  logger.config = config.logger
  await handleVersionIncrement()
  copyFiles(config.filesToCopy)
  await handlePkgJsonFiles()
  logger.logSuccess('Post SRC build')
}
