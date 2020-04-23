import { DEFAULT_PG_BUILD_CONFIG } from '../configs'
import { PgConfig } from '../models'

export class ConfigHandler {
  private _appConfig: PgConfig = DEFAULT_PG_BUILD_CONFIG
  public get appConfig(): PgConfig {
    return JSON.parse(JSON.stringify(this._appConfig))
  }
  public set appConfig(value: PgConfig) {
    this._appConfig = value
  }

  constructor() { }
}
