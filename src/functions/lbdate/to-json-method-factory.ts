import { TimeZoneOptions } from '../../config'
import { LbDateOptions, MomentLike } from '../../interfaces'
import { cloneDate, isMoment } from '../helpers'
import { formatTimeZone } from './format-time-zone'

export function toJsonMethodFactory(
  mergedOptions: LbDateOptions,
  lastToNativeJsonName: string | null
): (this: Date | MomentLike) => string {
  const { timezone, toNativeJsonName, manualTimeZoneOffset, precision }: LbDateOptions = mergedOptions
  const msInMin = 6e4
  const charsToRemove = precision == 0 ? -4 : precision - 3
  const nativeToJsonFuncKey: string =
    lastToNativeJsonName ||
      Date.prototype.hasOwnProperty(toNativeJsonName) ?
      toNativeJsonName :
      Date.prototype.toISOString.name
  let toJsonMethod: (this: Date) => string
  switch (timezone) {
    case TimeZoneOptions.auto:
      toJsonMethod = function (this: Date): string {
        const offSetMins = this.getTimezoneOffset()
        const date = cloneDate(this.getTime() - offSetMins * msInMin)
        let stringDate: string = date[nativeToJsonFuncKey]()
        stringDate = stringDate.slice(0, -1 + charsToRemove)
        return stringDate + formatTimeZone(offSetMins)
      }
      break
    case TimeZoneOptions.manual:
      toJsonMethod = function (this: Date): string {
        const offSetMins = manualTimeZoneOffset || 0
        const date = cloneDate(this.getTime() - offSetMins * msInMin)
        let stringDate: string = date[nativeToJsonFuncKey]()
        stringDate = stringDate.slice(0, -1 + charsToRemove)
        return stringDate + formatTimeZone(offSetMins)
      }
      break
    case TimeZoneOptions.none:
      toJsonMethod = function (this: Date): string {
        const offSetMins = this.getTimezoneOffset()
        const date = cloneDate(this.getTime() - offSetMins * msInMin)
        const stringDate: string = date[nativeToJsonFuncKey]()
        return stringDate.slice(0, -1 + charsToRemove)
      }
      break
    case TimeZoneOptions.utc:
      toJsonMethod = function (this: Date): string {
        const date = cloneDate(this)
        return date[nativeToJsonFuncKey]()
      }
      break
  }
  return function (this: Date | MomentLike): string {
    let date: Date | null = null
    if (isMoment(this)) date = new Date(this.valueOf())
    return toJsonMethod.call(date || this as Date)
  }
}
