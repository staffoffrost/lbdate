import { LOGGER_CONFIG } from '../configs'

export class ConfigHandler<T extends object> {
  private _config: T = { LOGGER_CONFIG } as T
  public get config(): T {
    return JSON.parse(JSON.stringify(this._config))
  }
  public set config(value: T) {
    this._config = value
  }

  constructor() { }
}
