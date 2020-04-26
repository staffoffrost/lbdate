import { runCommand } from '../handlers/cli-runner'
import { Provider } from '../provider'
import addBanners from './add-banners'
import hashFileNames from './hash-file-names'
import replaceString from './replace-string-in-files'
import verifyHashes from './verify-hashes'

export default async function main(): Promise<void> {
  const config = Provider.getPostPgBuildConfigHandler().config
  const logger = Provider.getLoggerHandler()
  logger.config = config.logger
  await replaceString()
  await hashFileNames()
  await verifyHashes()
  await runCommand(config.minifyHtmlCommand)
  await addBanners()
  logger.logSuccess('Post build procedure')
}
