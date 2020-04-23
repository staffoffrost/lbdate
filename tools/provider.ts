import { LOGGER_CONFIG } from './configs'
import { ConfigHandler, LoggerHandler } from './handlers'

export class Provider {
  private static container: { [key: string]: {} } = {}

  public static getConfigHandler = (): ConfigHandler => {
    if (!Provider.container[ConfigHandler.name]) {
      Provider.container[ConfigHandler.name] = new ConfigHandler()
    }
    return Provider.container[ConfigHandler.name] as ConfigHandler
  }
  public static getLoggerHandler = (): LoggerHandler => {
    if (!Provider.container[LoggerHandler.name]) {
      Provider.container[LoggerHandler.name] = new LoggerHandler(LOGGER_CONFIG)
    }
    return Provider.container[LoggerHandler.name] as LoggerHandler
  }

  private constructor() { }
}
