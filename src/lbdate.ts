import { getDefaultLbDateConfig, getGlobalLbDateConfig, LbDateOptions, setGlobalLbDateOptions } from './config'
import { cloneFunction, toJson } from './functions'
import { LbDateActions } from './lbdate-actions'

let lastOriginalToJsonName: string | null = null

/**
 * Will set the default options for date serialization.
 * @example
 * lbDate().init()
 * // --or--
 * lbDate().run(() => {
 *  // Your code here...
 * })
 * @default
 * options = {
 *  serialization: TimeZoneOptions.auto,
 *  manualTimeZoneOffset: null,
 *  originalToJsonName: 'originalToJSON',
 *  precision: 3
 * }
 */
export function lbDate(): LbDateActions
/**
 * Will set the provided options for date serialization merged with defaults.
 * @example
 * lbDate(options).init()
 * // --or--
 * lbDate(options).run(() => {
 *  // Your code here...
 * })
 * @default
 * options = {
 *  serialization: TimeZoneOptions.auto,
 *  manualTimeZoneOffset: null,
 *  originalToJsonName: 'originalToJSON',
 *  precision: 3
 * }
 */
export function lbDate(options: Partial<LbDateOptions>): LbDateActions
export function lbDate(options?: Partial<LbDateOptions>): LbDateActions {
  const mergedOptions = Object.assign(getDefaultLbDateConfig(), getGlobalLbDateConfig(), options)
  const originalToJsonName = mergedOptions.originalToJsonName
  mergedOptions.precision = mergedOptions.precision > 3 ? 3 : mergedOptions.precision < 0 ? 0 : mergedOptions.precision
  const resetToJsonFunctions = () => {
    if (lastOriginalToJsonName) {
      Date.prototype.toJSON = Date.prototype[lastOriginalToJsonName]
      delete Date.prototype[lastOriginalToJsonName]
      lastOriginalToJsonName = null
    }
  }
  return {
    init: () => {
      resetToJsonFunctions()
      lastOriginalToJsonName = originalToJsonName
      setGlobalLbDateOptions(mergedOptions)
      Date.prototype[originalToJsonName] = cloneFunction(Date.prototype.toJSON)
      Date.prototype.toJSON = toJson(mergedOptions)
    },
    run: <T = string | void>(fn: () => T): T => {
      const clonedToJson = cloneFunction(Date.prototype.toJSON) as (key?: any) => string
      let wasOriginalToJsonCopied = false
      if (!Date.prototype[originalToJsonName]) {
        Date.prototype[originalToJsonName] = clonedToJson
        wasOriginalToJsonCopied = true
      }
      Date.prototype.toJSON = toJson(mergedOptions)
      let error: Error | null = null
      let jsonString: T
      try {
        jsonString = fn()
      } catch (e) {
        error = e
      }
      Date.prototype.toJSON = clonedToJson
      if (wasOriginalToJsonCopied) {
        delete Date.prototype[originalToJsonName]
      }
      if (error) throw error
      return jsonString!
    },
    restore: () => {
      resetToJsonFunctions()
      setGlobalLbDateOptions({})
    },
    getGlobalConfig: () => getGlobalLbDateConfig(),
    getDefaultConfig: () => getDefaultLbDateConfig(),
  }
}
