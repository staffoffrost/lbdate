import { LbDateOptions, TimeZoneOptions } from '../config'
import { cloneDate } from './clone-date'
import { formatTimeZone } from './format-time-zone'
import { validateOffset } from './validate-offset'

export function toJson(options: LbDateOptions): (this: Date) => string {
  const msInMin = 6e4
  const precision = options.precision == 0 ? -4 : options.precision - 3
  const toOriginalJsonFuncKey: string = Date.prototype[options.originalToJsonName] ?
    options.originalToJsonName :
    Date.prototype.toISOString.name
  switch (options.timezone) {
    case TimeZoneOptions.default:
      return function (this: Date): string {
        const offSetMins = validateOffset(this.getTimezoneOffset())
        const date = cloneDate(this.getTime() - offSetMins * msInMin)
        let stringDate: string = date[toOriginalJsonFuncKey]()
        stringDate = stringDate.slice(0, -1 + precision)
        return stringDate + formatTimeZone(offSetMins)
      }
    case TimeZoneOptions.manual:
      return function (this: Date): string {
        const offSetMins = validateOffset(options.manualTimeZoneOffset || 0)
        const date = cloneDate(this.getTime() - offSetMins * msInMin)
        let stringDate: string = date[toOriginalJsonFuncKey]()
        stringDate = stringDate.slice(0, -1 + precision)
        return stringDate + formatTimeZone(offSetMins)
      }
    case TimeZoneOptions.none:
      return function (this: Date): string {
        const offSetMins = this.getTimezoneOffset()
        const date = cloneDate(this.getTime() - offSetMins * msInMin)
        const stringDate: string = date[toOriginalJsonFuncKey]()
        return stringDate.slice(0, -1 + precision)
      }
    case TimeZoneOptions.utc:
      return function (this: Date): string {
        return this[toOriginalJsonFuncKey]()
      }
  }
}
