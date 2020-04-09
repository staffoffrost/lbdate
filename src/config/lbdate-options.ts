import { TimeZoneOptions } from './time-zone-options.enum'

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
   * Configure manual time zone offset in Minutes if the timezone option is set to manual.
   * Otherwise this setting will be ignored. Supported range: **-840** - **840**.
   * @default
   * manualTimeZoneOffset = null
   */
  manualTimeZoneOffset: number | null
  /**
   * While LbDate is initializing, it will clone the native **toJSON** method
   * to this given name and will store it on the Date's prototype.
   * @default
   * originalToJsonName = 'originalToJSON'
   */
  originalToJsonName: string
  /**
   * The number of second fraction digits.
   * Supported range: **0** - **3**.
   * @default
   * precision = 3
   */
  precision: number
}
