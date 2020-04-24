import { LOGGER_CONFIG } from './configs'
import { ConfigHandler, LoggerHandler } from './handlers'
import { HashHandler } from './handlers/hash.handler'

export class Provider {
  private static container: { [key: string]: {} } = {}

  public static getConfigHandler = <T extends object>(): ConfigHandler<T> => {
    if (!Provider.container[ConfigHandler.name]) {
      Provider.container[ConfigHandler.name] = new ConfigHandler()
    }
    return Provider.container[ConfigHandler.name] as ConfigHandler<T>
  }
  public static getLoggerHandler = (): LoggerHandler => {
    if (!Provider.container[LoggerHandler.name]) {
      Provider.container[LoggerHandler.name] = new LoggerHandler(LOGGER_CONFIG)
    }
    return Provider.container[LoggerHandler.name] as LoggerHandler
  }
  public static getHashHandler = (): HashHandler => {
    if (!Provider.container[HashHandler.name]) {
      Provider.container[HashHandler.name] = new HashHandler()
    }
    return Provider.container[HashHandler.name] as HashHandler
  }

  private constructor() { }
}
