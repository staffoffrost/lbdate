import { LoggerConfig } from './logger-config'

export interface SrcBuildConfig {
  logger: LoggerConfig,
  rootFolder: string,
  buildFolder: string,
  buildSets: {
    command: string,
    startInfoLog: string,
    endInfoLog: string,
  }[],
}
