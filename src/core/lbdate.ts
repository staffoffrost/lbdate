import { createMergedLbdateOptions, getDefaultLbDateConfig, getGlobalLbDateConfig, setGlobalLbDateOptions } from '../config'
import { cloneDate, createMomentToDateMethod, isMoment, objectAssign, overrideDatesToJson, restoreDatesToJson, setMethodToDatesProto, toJsonMethodFactory } from '../functions'
import { LbDate, LbDateActions, LbDateOptions, MomentLike, MomentObj } from '../interfaces'
import { getLastToNativeJsonName, setLastToNativeJsonName } from './last-to-native-json-name'
import { restoreMomentsToDateMethod, setMoment } from './moment-handler'

const lbDate: LbDate = (() => {
  const _f: (options?: Partial<LbDateOptions>) => LbDateActions = (options?: Partial<LbDateOptions>): LbDateActions => {
    const mergedOptions: LbDateOptions = createMergedLbdateOptions(getLastToNativeJsonName(), options)
    const toNativeJsonName: string = mergedOptions.toNativeJsonName
    const createToJsonMethod = () => toJsonMethodFactory(mergedOptions, getLastToNativeJsonName())
    return {
      init: (moment?: MomentObj) => {
        restoreDatesToJson(getLastToNativeJsonName(), setLastToNativeJsonName)
        setLastToNativeJsonName(toNativeJsonName)
        setGlobalLbDateOptions(mergedOptions)
        setMethodToDatesProto(toNativeJsonName, Date.prototype.toJSON)
        const toJsonMethod: (this: Date) => string = createToJsonMethod()
        overrideDatesToJson(toJsonMethod)
        if (moment) setMoment(moment, toJsonMethod)
      },
      toJSON: createToJsonMethod(),
      override: <T extends Date | MomentLike>(date: T): T => {
        const toJsonMethod = createToJsonMethod()
        if (isMoment(date)) {
          date.toDate = createMomentToDateMethod(toJsonMethod)
        } else {
          (<Date>date).toJSON = createToJsonMethod()
        }
        return date
      },
      run: <T = string | void>(fn: () => T): T => {
        const originalToJson = Date.prototype.toJSON
        const isSameToNativeJsonName = toNativeJsonName === getLastToNativeJsonName()
        if (!isSameToNativeJsonName) setMethodToDatesProto(toNativeJsonName, originalToJson)
        const toJsonMethod: (this: Date) => string = createToJsonMethod()
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
        overrideDatesToJson(originalToJson)
        if (error) throw error
        return jsonString!
      },
      getReplacer: (continuation?: (key: string, value: any) => any) => {
        const toJSON = createToJsonMethod()
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
        restoreMomentsToDateMethod()
      },
      getGlobalConfig: () => getGlobalLbDateConfig(),
      getDefaultConfig: () => getDefaultLbDateConfig(),
    }
  }
  const _o: LbDateActions = {
    init: (moment?: MomentObj) => _f().init(moment),
    toJSON: _f().toJSON,
    override: <T extends Date | MomentLike>(date: T): T => _f().override(date),
    run: <T = string | void>(fn: () => T): T => _f().run(fn) as any,
    getReplacer: (continuation?: (key: string, value: any) => any) => _f().getReplacer(continuation),
    restore: () => _f().restore(),
    getGlobalConfig: () => _f().getGlobalConfig(),
    getDefaultConfig: () => _f().getDefaultConfig(),
  }
  return objectAssign(_f, _o)
})()

export { lbDate }

