import { readJsonSync } from 'fs-extra'

export class AppDetails {

  private _appName: string | null = null
  public get appName(): string {
    if (!this._appName) this._appName = this._getAppName()
    return this._appName
  }

  private _appVer: string | null = null
  public get appVer(): string {
    if (!this._appVer) this._appVer = this._getAppVer()
    return this._appVer
  }
  public set appVer(value: string) {
    this._appVer = value
  }

  constructor() { }

  private _getAppName(): string {
    const pkgJson: any = readJsonSync('./package.json', { encoding: 'utf8' })
    if (!pkgJson || !pkgJson.name) throw new Error('Package json is invalid.')
    return pkgJson.name.trim()
  }

  private _getAppVer(): string {
    const pkgJson: any = readJsonSync('./package.json', { encoding: 'utf8' })
    if (!pkgJson || !pkgJson.version) throw new Error('Package json is invalid.')
    return pkgJson.version.trim()
  }

  public resetDetails(): void {
    this._appName = this._getAppName()
    this._appVer = this._getAppVer()
  }
}
