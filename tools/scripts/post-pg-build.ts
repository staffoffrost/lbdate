import { POST_PG_BUILD_CONFIG } from '../configs'
import { Provider } from '../provider'
import replaceString from './replace-string'

export default async function main(): Promise<void> {
  const logger = Provider.getLoggerHandler()
  setConfiguration()
  await replaceString()
  logger.logSuccess('Post build procedure')
}

function setConfiguration(): void {
  const config = Provider.getConfigHandler()
  config.appConfig = POST_PG_BUILD_CONFIG
  const logger = Provider.getLoggerHandler()
  logger.config = POST_PG_BUILD_CONFIG.logger
}
