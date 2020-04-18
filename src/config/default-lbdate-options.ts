import { objectAssign } from '../functions'
import { LbDateOptions } from './lbdate-options'
import { TimeZoneOptions } from './time-zone-options.enum'

const DEFAULT_LBDATE_OPTIONS: LbDateOptions = {
  timezone: TimeZoneOptions.auto,
  manualTimeZoneOffset: null,
  toNativeJsonName: 'toNativeJSON',
  precision: 3,
}

export function getDefaultLbDateConfig(): LbDateOptions {
  return objectAssign({}, DEFAULT_LBDATE_OPTIONS)
}
