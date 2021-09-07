import { TimeZoneOptions } from '../../config'
import { LbDateOptions } from '../../interfaces'
import { cloneDate } from '../helpers'
import { formatTimeZone } from './format-time-zone'

export function toJsonMethodFactory(mergedOptions: LbDateOptions, lastToNativeJsonName: string | null): (this: Date) => string {
  const { timezone, toNativeJsonName, manualTimeZoneOffset, precision }: LbDateOptions = mergedOptions
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
