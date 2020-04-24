import { LOGGER_CONFIG } from './configs'
import { ConfigHandler, LoggerHandler } from './handlers'
import { AppDetails } from './handlers/app-details.handler'
import { HashHandler } from './handlers/hash.handler'
import { PostPgBuildConfig, PostSrcBuildConfig } from './models'

export class Provider {

  private static container: { [key: string]: {} } = {}

  public static getPostPgBuildConfigHandler = (): ConfigHandler<PostPgBuildConfig> => {
    if (!Provider.container[ConfigHandler.name]) {
      Provider.container[ConfigHandler.name] = new ConfigHandler<PostPgBuildConfig>()
    }
    return Provider.container[ConfigHandler.name] as ConfigHandler<PostPgBuildConfig>
  }
  public static getPostSrcBuildConfigHandler = (): ConfigHandler<PostSrcBuildConfig> => {
    if (!Provider.container[ConfigHandler.name]) {
      Provider.container[ConfigHandler.name] = new ConfigHandler<PostSrcBuildConfig>()
    }
    return Provider.container[ConfigHandler.name] as ConfigHandler<PostSrcBuildConfig>
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
  public static getAppDetailsHandler = (): AppDetails => {
    if (!Provider.container[AppDetails.name]) {
      Provider.container[AppDetails.name] = new AppDetails()
    }
    return Provider.container[AppDetails.name] as AppDetails
  }

  private constructor() { }
}
