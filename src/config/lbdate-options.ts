import { TimeZoneOptions } from './time-zone-options.enum'

export interface LbDateOptions {
  serialization: TimeZoneOptions
  manualTimeZoneOffset: number | null
  originalToJsonName: string
  precision: number
}
