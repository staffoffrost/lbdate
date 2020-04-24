import { LogLevels } from '../enums'
import { PostPgBuildConfig } from '../models'

export const LOGGER_CONFIG: PostPgBuildConfig['logger'] = {
  isActive: true,
  consoleLogLevel: LogLevels.log,
  fileLogLevel: LogLevels.none,
  logFolderLocation: 'logs',
}
