import { LogLevels } from '../enums'

export interface PgConfig {
  logger: {
    isActive: boolean,
    consoleLogLevel: LogLevels,
    fileLogLevel: LogLevels,
    logFolderLocation: string,
  }
}
