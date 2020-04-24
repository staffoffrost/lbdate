import { isNumber, isString } from '../helpers'
import { Provider } from '../provider'

export class HashHandler {

  private _hash: string | null = null
  public get hash(): string {
    if (!this._hash) this._hash = this._generateHash()
    return this._hash
  }

  constructor() { }

  private _generateHash(): string {
    const config = Provider.getPostPgBuildConfigHandler().appConfig
    const getRandomInteger = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    if (!isNumber(config.hashLength)
      || !isString(config.hashCharPool)
    ) {
      throw new Error('Hash generator is missing a configuration for hash length or hash char pool.')
    }
    let localHash = ''
    for (let i = 0; i < config.hashLength; i++) {
      const charIndex = getRandomInteger(0, config.hashCharPool.length - 1)
      localHash += config.hashCharPool[charIndex]
    }
    return localHash
  }
}
