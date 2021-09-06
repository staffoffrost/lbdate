import { createMergedLbdateOptions, getDefaultLbDateConfig, getGlobalLbDateConfig, setGlobalLbDateOptions } from '../config'
import { cloneDate, cloneFunction, momentToDate, objectAssign, overrideDatesToJson, restoreDatesToJson, setMethodToDatesProto, toJsonMethodFactory } from '../functions'
import { LbDate, LbDateActions, LbDateOptions, MomentObj } from '../interfaces'
import { getLastToNativeJsonName, setLastToNativeJsonName } from './last-to-native-json-name'

let momentRef: MomentObj | null = null
let momentToDateMethodCache: ((this: any) => Date) | null = null

const lbDate: LbDate = (() => {
  const _f: (options?: Partial<LbDateOptions>) => LbDateActions = (options?: Partial<LbDateOptions>): LbDateActions => {
    const mergedOptions: LbDateOptions = createMergedLbdateOptions(getLastToNativeJsonName(), options)
    const toNativeJsonName: string = mergedOptions.toNativeJsonName
    const _createToJsonMethod: () => (this: Date) => string = () => toJsonMethodFactory(mergedOptions, getLastToNativeJsonName())
    return {
      init: (moment?: MomentObj) => {
        restoreDatesToJson(getLastToNativeJsonName(), setLastToNativeJsonName)
        setLastToNativeJsonName(toNativeJsonName)
        setGlobalLbDateOptions(mergedOptions)
        const clonedToJson = cloneFunction(Date.prototype.toJSON)
        setMethodToDatesProto(toNativeJsonName, clonedToJson)
        const toJsonMethod = _createToJsonMethod()
        overrideDatesToJson(toJsonMethod)
        if (moment) {
          momentRef = moment
          momentToDateMethodCache = cloneFunction(moment.prototype.toDate) as (this: any) => Date
          momentRef.prototype.toDate = momentToDate(toJsonMethod)
        }
      },
      toJSON: _createToJsonMethod(),
      override: (date: Date): Date => {
        date.toJSON = _createToJsonMethod()
        return date
      },
      run: <T = string | void>(fn: () => T): T => {
        const clonedToJson = cloneFunction(Date.prototype.toJSON) as (key?: any) => string
        const isSameToNativeJsonName = toNativeJsonName === getLastToNativeJsonName()
        if (!isSameToNativeJsonName) setMethodToDatesProto(toNativeJsonName, clonedToJson)
        const toJsonMethod: (this: Date) => string = _createToJsonMethod()
        overrideDatesToJson(toJsonMethod)
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
        overrideDatesToJson(clonedToJson)
        if (error) throw error
        return jsonString!
      },
      getReplacer: (continuation?: (key: string, value: any) => any) => {
        const toJSON = _createToJsonMethod()
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
        restoreDatesToJson(getLastToNativeJsonName(), setLastToNativeJsonName)
        setGlobalLbDateOptions({})
        if (!momentRef) return
        if (momentToDateMethodCache) {
          momentRef.prototype.toDate = momentToDateMethodCache
          momentToDateMethodCache = null
        }
        momentRef = null
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
    getReplacer: (continuation?: (key: string, value: any) => any) => _f().getReplacer(continuation),
    restore: () => _f().restore(),
    getGlobalConfig: () => _f().getGlobalConfig(),
    getDefaultConfig: () => _f().getDefaultConfig(),
  }
  return objectAssign(_f, _o)
})()

export { lbDate }

