import { POST_PG_BUILD_CONFIG } from '../configs'
import { Provider } from '../provider'
import hashFileNames from './hash-file-names'
import replaceString from './replace-string-in-files'
import verifyHashes from './verify-hashes'

export default async function main(): Promise<void> {
  const logger = Provider.getLoggerHandler()
  setConfiguration()
  await replaceString()
  await hashFileNames()
  await verifyHashes()
  logger.logSuccess('Post build procedure')
}

function setConfiguration(): void {
  const config = Provider.getPostPgBuildConfigHandler()
  config.appConfig = POST_PG_BUILD_CONFIG
  const logger = Provider.getLoggerHandler()
  logger.config = POST_PG_BUILD_CONFIG.logger
}
