import { LOGGER_CONFIG } from '../configs'

export class ConfigHandler<T extends object> {
  private _appConfig: T = { LOGGER_CONFIG } as T
  public get appConfig(): T {
    return JSON.parse(JSON.stringify(this._appConfig))
  }
  public set appConfig(value: T) {
    this._appConfig = value
  }

  constructor() { }
}
