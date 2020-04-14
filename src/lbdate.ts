import { getDefaultLbDateConfig, getGlobalLbDateConfig, LbDateOptions, setGlobalLbDateOptions, TimeZoneOptions } from './config'
import { cloneDate, cloneFunction, formatTimeZone, objectAssign } from './functions'
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
  const mergedOptions = objectAssign(getDefaultLbDateConfig(), getGlobalLbDateConfig(), options) as LbDateOptions
  let timezone = mergedOptions.timezone
  if (![TimeZoneOptions.auto, TimeZoneOptions.manual, TimeZoneOptions.none, TimeZoneOptions.utc].includes(timezone)) {
    timezone = TimeZoneOptions.auto
    mergedOptions.timezone = timezone
  }
  let originalToJsonName = mergedOptions.originalToJsonName
  if (lastOriginalToJsonName !== originalToJsonName &&
    Date.prototype.hasOwnProperty(originalToJsonName)
  ) {
    originalToJsonName = getDefaultLbDateConfig().originalToJsonName
    mergedOptions.originalToJsonName = originalToJsonName
  }
  let manualTimeZoneOffset = mergedOptions.manualTimeZoneOffset
  if (manualTimeZoneOffset) {
    if (manualTimeZoneOffset > 840) manualTimeZoneOffset = 840
    else if (manualTimeZoneOffset < -840) manualTimeZoneOffset = -840
    mergedOptions.manualTimeZoneOffset = manualTimeZoneOffset
  }
  let precision = mergedOptions.precision
  if (precision > 3) precision = 3
  else if (precision < 0) precision = 0
  mergedOptions.precision = precision
  const restoreToJsonFunctions = () => {
    if (lastOriginalToJsonName) {
      Date.prototype.toJSON = Date.prototype[lastOriginalToJsonName]
      delete Date.prototype[lastOriginalToJsonName]
      lastOriginalToJsonName = null
    }
  }
  const createToJson = (): (this: Date) => string => {
    const msInMin = 6e4
    const charsToRemove = precision == 0 ? -4 : precision - 3
    const originalJsonFuncKey: string =
      lastOriginalToJsonName ||
        Date.prototype.hasOwnProperty(originalToJsonName) ?
        originalToJsonName :
        Date.prototype.toISOString.name
    switch (timezone) {
      case TimeZoneOptions.auto:
        return function (this: Date): string {
          const offSetMins = this.getTimezoneOffset()
          const date = cloneDate(this.getTime() - offSetMins * msInMin)
          let stringDate: string = date[originalJsonFuncKey]()
          stringDate = stringDate.slice(0, -1 + charsToRemove)
          return stringDate + formatTimeZone(offSetMins)
        }
      case TimeZoneOptions.manual:
        return function (this: Date): string {
          const offSetMins = manualTimeZoneOffset || 0
          const date = cloneDate(this.getTime() - offSetMins * msInMin)
          let stringDate: string = date[originalJsonFuncKey]()
          stringDate = stringDate.slice(0, -1 + charsToRemove)
          return stringDate + formatTimeZone(offSetMins)
        }
      case TimeZoneOptions.none:
        return function (this: Date): string {
          const offSetMins = this.getTimezoneOffset()
          const date = cloneDate(this.getTime() - offSetMins * msInMin)
          const stringDate: string = date[originalJsonFuncKey]()
          return stringDate.slice(0, -1 + charsToRemove)
        }
      case TimeZoneOptions.utc:
        return function (this: Date): string {
          return this[originalJsonFuncKey]()
        }
    }
  }
  return {
    init: () => {
      restoreToJsonFunctions()
      lastOriginalToJsonName = originalToJsonName
      setGlobalLbDateOptions(mergedOptions)
      Date.prototype[originalToJsonName] = cloneFunction(Date.prototype.toJSON)
      Date.prototype.toJSON = createToJson()
    },
    run: <T = string | void>(fn: () => T): T => {
      const clonedToJson = cloneFunction(Date.prototype.toJSON) as (key?: any) => string
      const isSameOriginalToJsonName = originalToJsonName === lastOriginalToJsonName
      if (!isSameOriginalToJsonName) {
        Date.prototype[originalToJsonName] = clonedToJson
      }
      Date.prototype.toJSON = createToJson()
      let error: Error | null = null
      let jsonString: T
      try {
        jsonString = fn()
      } catch (e) {
        error = e
      }
      if (!isSameOriginalToJsonName) {
        delete Date.prototype[originalToJsonName]
      }
      Date.prototype.toJSON = clonedToJson
      if (error) throw error
      return jsonString!
    },
    restore: () => {
      restoreToJsonFunctions()
      setGlobalLbDateOptions({})
    },
    getGlobalConfig: () => getGlobalLbDateConfig(),
    getDefaultConfig: () => getDefaultLbDateConfig(),
  }
}
