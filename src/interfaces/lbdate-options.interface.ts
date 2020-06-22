import { TimeZoneOptions } from '../config/time-zone-options.enum'

/**
 * LbDate date serialization options.
 */
export interface LbDateOptions {
  /**
   * Date serialization time zone options.
   * @default
   * timezone = TimeZoneOptions.default
   * // "2020-04-08T05:47:13.261+03:00"
   */
  timezone: TimeZoneOptions
  /**
   * Set time zone offset in Minutes and the _timezone_ option to manual,
   * otherwise this setting will be ignored. Supported range: **-840** - **840**.
   * @default
   * manualTimeZoneOffset = null
   */
  manualTimeZoneOffset: number | null
  /**
   * While LbDate is initializing, it will clone the native **toJSON** method
   * to this given name and will store it on the Date's prototype.
   * @default
   * toNativeJsonName = 'toNativeJSON'
   */
  toNativeJsonName: string
  /**
   * The number of second fraction digits.
   * Supported range: **0** - **3**.
   * @default
   * precision = 3
   */
  precision: number
}
