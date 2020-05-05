import { addBanners, hashFileNames, replaceStringsInFile, runCommand } from '../handlers'
import { verifyHashes } from '../handlers/hash-verifier.handler'
import { Provider } from '../provider'

export default async function main(): Promise<void> {
  const config = Provider.getPostPgBuildConfigHandler().config
  const logger = Provider.getLoggerHandler()
  logger.config = config.logger
  replaceStringsInFile(config.fileStringReplacement)
  hashFileNames(config.fileHasher)
  verifyHashes(config.hashVerifier)
  await runCommand(config.minifyHtmlCommand)
  addBanners(config.bannerAdder)
  logger.logSuccess('Post build procedure')
}
