import { LogLevels } from '../enums'
import { PostPgBuildConfig } from '../models'

export const FAKE_POST_PG_BUILD_CONFIG: PostPgBuildConfig = {
  logger: {
    isActive: true,
    consoleLogLevel: LogLevels.log,
    fileLogLevel: LogLevels.none,
    logFolderLocation: 'logs',
  },
}
