import { LOGGER_CONFIG, POST_PG_BUILD_CONFIG, POST_SRC_BUILD_CONFIG } from './configs'
import { SRC_BUILD_CONFIG } from './configs/src-build-config'
import { ConfigHandler, LoggerHandler } from './handlers'
import { AppDetails } from './handlers/app-details.handler'
import { HashHandler } from './handlers/hash.handler'
import { PostPgBuildConfig, PostSrcBuildConfig, SrcBuildConfig } from './models'

export class Provider {

  private static container: { [key: string]: {} } = {}

  public static getPostPgBuildConfigHandler = (): ConfigHandler<PostPgBuildConfig> => {
    if (!Provider.container[ConfigHandler.name]) {
      Provider.container[ConfigHandler.name] = new ConfigHandler<PostPgBuildConfig>(POST_PG_BUILD_CONFIG)
    }
    return Provider.container[ConfigHandler.name] as ConfigHandler<PostPgBuildConfig>
  }
  public static getPostSrcBuildConfigHandler = (): ConfigHandler<PostSrcBuildConfig> => {
    if (!Provider.container[ConfigHandler.name]) {
      Provider.container[ConfigHandler.name] = new ConfigHandler<PostSrcBuildConfig>(POST_SRC_BUILD_CONFIG)
    }
    return Provider.container[ConfigHandler.name] as ConfigHandler<PostSrcBuildConfig>
  }
  public static getSrcBuildConfigHandler = (): ConfigHandler<SrcBuildConfig> => {
    if (!Provider.container[ConfigHandler.name]) {
      Provider.container[ConfigHandler.name] = new ConfigHandler<SrcBuildConfig>(SRC_BUILD_CONFIG)
    }
    return Provider.container[ConfigHandler.name] as ConfigHandler<SrcBuildConfig>
  }
  public static getLoggerHandler = (): LoggerHandler => {
    if (!Provider.container[LoggerHandler.name]) {
      Provider.container[LoggerHandler.name] = new LoggerHandler(LOGGER_CONFIG)
    }
    return Provider.container[LoggerHandler.name] as LoggerHandler
  }
  public static getHashHandler = (): HashHandler => {
    if (!Provider.container[HashHandler.name]) {
      Provider.container[HashHandler.name] = new HashHandler(Provider.getPostPgBuildConfigHandler())
    }
    return Provider.container[HashHandler.name] as HashHandler
  }
  public static getAppDetailsHandler = (): AppDetails => {
    if (!Provider.container[AppDetails.name]) {
      Provider.container[AppDetails.name] = new AppDetails(Provider.getPostSrcBuildConfigHandler())
    }
    return Provider.container[AppDetails.name] as AppDetails
  }

  private constructor() { }
}
