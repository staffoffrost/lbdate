import { POST_PG_BUILD_CONFIG } from '../configs'
import { LoggerHandler } from '../handlers'
import { runCommand } from '../handlers/cli-runner'
import { Provider } from '../provider'
import addBanners from './add-banners'
import hashFileNames from './hash-file-names'
import replaceString from './replace-string-in-files'
import verifyHashes from './verify-hashes'

export default async function main(): Promise<void> {
  const logger = Provider.getLoggerHandler()
  setConfiguration(logger)
  await replaceString()
  await hashFileNames()
  await verifyHashes()
  const minifyHtmlCommand = Provider.getPostPgBuildConfigHandler().config.minifyHtmlCommand
  await runCommand(minifyHtmlCommand)
  await addBanners()
  logger.logSuccess('Post build procedure')
}

function setConfiguration(logger: LoggerHandler): void {
  const config = Provider.getPostPgBuildConfigHandler()
  config.config = POST_PG_BUILD_CONFIG
  logger.config = POST_PG_BUILD_CONFIG.logger
}
