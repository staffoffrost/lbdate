import { getDefaultLbDateConfig, getGlobalLbDateConfig, LbDateOptions, setGlobalLbDateOptions, TimeZoneOptions } from './config'
import { cloneDate, cloneFunction, formatTimeZone, objectAssign } from './functions'
import { LbDateActions } from './lbdate-actions'

let lastToNativeJsonName: string | null = null

/**
 * Will set the default options for date's serialization.
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
 *  toNativeJsonName: 'toNativeJSON',
 *  precision: 3
 * }
 */
export function lbDate(): LbDateActions
/**
 * Will set the provided options for date's serialization merged with defaults.
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
 *  toNativeJsonName: 'toNativeJSON',
 *  precision: 3
 * }
 */
export function lbDate(options: Partial<LbDateOptions>): LbDateActions
export function lbDate(options?: Partial<LbDateOptions>): LbDateActions {
  if (options) {
    if (options.manualTimeZoneOffset) options.manualTimeZoneOffset = Math.round(options.manualTimeZoneOffset)
    if (options.precision) options.manualTimeZoneOffset = Math.round(options.precision)
  }
  const mergedOptions = objectAssign(getDefaultLbDateConfig(), getGlobalLbDateConfig(), options) as LbDateOptions
  let timezone = mergedOptions.timezone
  if (![TimeZoneOptions.auto, TimeZoneOptions.manual, TimeZoneOptions.none, TimeZoneOptions.utc].includes(timezone)) {
    timezone = TimeZoneOptions.auto
    mergedOptions.timezone = timezone
  }
  let toNativeJsonName = mergedOptions.toNativeJsonName
  if (lastToNativeJsonName !== toNativeJsonName &&
    Date.prototype.hasOwnProperty(toNativeJsonName)
  ) {
    toNativeJsonName = getDefaultLbDateConfig().toNativeJsonName
    mergedOptions.toNativeJsonName = toNativeJsonName
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
  const setDateToJson = (method: (key?: any) => string): void => {
    Date.prototype.toJSON = method
  }
  const restoreToJsonFunctions = () => {
    if (lastToNativeJsonName) {
      setDateToJson(Date.prototype[lastToNativeJsonName])
      delete Date.prototype[lastToNativeJsonName]
      lastToNativeJsonName = null
    }
  }
  const createToJson = (): (this: Date) => string => {
    const msInMin = 6e4
    const charsToRemove = precision == 0 ? -4 : precision - 3
    const nativeToJsonFuncKey: string =
      lastToNativeJsonName ||
        Date.prototype.hasOwnProperty(toNativeJsonName) ?
        toNativeJsonName :
        Date.prototype.toISOString.name
    switch (timezone) {
      case TimeZoneOptions.auto:
        return function (this: Date): string {
          const offSetMins = this.getTimezoneOffset()
          const date = cloneDate(this.getTime() - offSetMins * msInMin)
          let stringDate: string = date[nativeToJsonFuncKey]()
          stringDate = stringDate.slice(0, -1 + charsToRemove)
          return stringDate + formatTimeZone(offSetMins)
        }
      case TimeZoneOptions.manual:
        return function (this: Date): string {
          const offSetMins = manualTimeZoneOffset || 0
          const date = cloneDate(this.getTime() - offSetMins * msInMin)
          let stringDate: string = date[nativeToJsonFuncKey]()
          stringDate = stringDate.slice(0, -1 + charsToRemove)
          return stringDate + formatTimeZone(offSetMins)
        }
      case TimeZoneOptions.none:
        return function (this: Date): string {
          const offSetMins = this.getTimezoneOffset()
          const date = cloneDate(this.getTime() - offSetMins * msInMin)
          const stringDate: string = date[nativeToJsonFuncKey]()
          return stringDate.slice(0, -1 + charsToRemove)
        }
      case TimeZoneOptions.utc:
        return function (this: Date): string {
          return this[nativeToJsonFuncKey]()
        }
    }
  }
  return {
    init: () => {
      restoreToJsonFunctions()
      lastToNativeJsonName = toNativeJsonName
      setGlobalLbDateOptions(mergedOptions)
      Date.prototype[toNativeJsonName] = cloneFunction(Date.prototype.toJSON)
      setDateToJson(createToJson())
    },
    run: <T = string | void>(fn: () => T): T => {
      const clonedToJson = cloneFunction(Date.prototype.toJSON) as (key?: any) => string
      const isSameToNativeJsonName = toNativeJsonName === lastToNativeJsonName
      if (!isSameToNativeJsonName) {
        Date.prototype[toNativeJsonName] = clonedToJson
      }
      setDateToJson(createToJson())
      let error: Error | null = null
      let jsonString: T
      try {
        jsonString = fn()
      } catch (e) {
        error = e
      }
      if (!isSameToNativeJsonName) {
        delete Date.prototype[toNativeJsonName]
      }
      setDateToJson(clonedToJson)
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
