import { LogLevels } from '../enums'
import { PgConfig } from '../models'

export const DEFAULT_PG_BUILD_CONFIG: PgConfig = {
  logger: {
    isActive: true,
    consoleLogLevel: LogLevels.log,
    fileLogLevel: LogLevels.none,
    logFolderLocation: 'logs',
  },
}
