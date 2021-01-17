import { getDefaultLbDateConfig, getGlobalLbDateConfig, setGlobalLbDateOptions, TimeZoneOptions } from '../config'
import { cloneDate, cloneFunction, formatTimeZone, momentToDate, objectAssign } from '../functions'
import { LbDate, LbDateActions, LbDateOptions, MomentObj } from '../interfaces'

let lastToNativeJsonName: string | null = null
let momentRef: MomentObj | null = null
// tslint:disable-next-line: ban-types
let momentToDateMethodCache: ((this: any) => Date) | null = null

const lbDate: LbDate = (() => {
  const _f: (options?: Partial<LbDateOptions>) => LbDateActions = (options?: Partial<LbDateOptions>): LbDateActions => {
    if (options) {
      if (options.manualTimeZoneOffset) options.manualTimeZoneOffset = Math.round(options.manualTimeZoneOffset)
      if (options.precision) options.precision = Math.round(options.precision)
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
    const setDateToJsonMethod = (method: (key?: any) => string): void => {
      Date.prototype.toJSON = method
    }
    const restoreToJsonMethods = () => {
      if (lastToNativeJsonName) {
        setDateToJsonMethod(Date.prototype[lastToNativeJsonName])
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
            const date = cloneDate(this)
            return date[nativeToJsonFuncKey]()
          }
      }
    }
    return {
      init: (moment?: MomentObj) => {
        restoreToJsonMethods()
        lastToNativeJsonName = toNativeJsonName
        setGlobalLbDateOptions(mergedOptions)
        Date.prototype[toNativeJsonName] = cloneFunction(Date.prototype.toJSON)
        const toJsonMethod = createToJson()
        setDateToJsonMethod(toJsonMethod)
        if (moment) {
          if (!momentRef) momentRef = moment
          if (!momentToDateMethodCache) momentToDateMethodCache = cloneFunction(moment.prototype.toDate) as (this: any) => Date
          momentRef.prototype.toDate = momentToDate(toJsonMethod)
        }
      },
      toJSON: createToJson(),
      override: (date: Date): Date => {
        date.toJSON = createToJson()
        return date
      },
      run: <T = string | void>(fn: () => T): T => {
        const clonedToJson = cloneFunction(Date.prototype.toJSON) as (key?: any) => string
        const isSameToNativeJsonName = toNativeJsonName === lastToNativeJsonName
        if (!isSameToNativeJsonName) {
          Date.prototype[toNativeJsonName] = clonedToJson
        }
        setDateToJsonMethod(createToJson())
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
        setDateToJsonMethod(clonedToJson)
        if (error) throw error
        return jsonString!
      },
      getReplacer: (continuation?: (key: string, value: any) => any) => {
        const toJSON = createToJson()
        return function (this: any, key: string, value: any): any {
          if (this[key] instanceof Date) {
            const date: Date = cloneDate(this[key])
            date.toJSON = toJSON
            value = date.toJSON()
          }
          return continuation ? continuation.call(this, key, value) : value
        }
      },
      restore: () => {
        restoreToJsonMethods()
        setGlobalLbDateOptions({})
        if (momentRef) {
          if (momentToDateMethodCache) {
            momentRef.prototype.toDate = momentToDateMethodCache
            momentToDateMethodCache = null
          }
          momentRef = null
        }
      },
      getGlobalConfig: () => getGlobalLbDateConfig(),
      getDefaultConfig: () => getDefaultLbDateConfig(),
    }
  }
  const _o: LbDateActions = {
    init: (moment?: MomentObj) => _f().init(moment),
    toJSON: _f().toJSON,
    override: (date: Date) => _f().override(date),
    run: <T = string | void>(fn: () => T): T => _f().run(fn) as any,
    getReplacer: (continuation) => _f().getReplacer(continuation),
    restore: () => _f().restore(),
    getGlobalConfig: () => _f().getGlobalConfig(),
    getDefaultConfig: () => _f().getDefaultConfig(),
  }
  return objectAssign(_f, _o)
})()

export { lbDate }

