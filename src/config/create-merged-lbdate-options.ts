import { isNumber, mathRound, objectAssign } from '../functions'
import { LbDateOptions } from '../interfaces'
import { getDefaultLbDateConfig } from './default-lbdate-options'
import { getGlobalLbDateConfig } from './global-lbdate-options'
import { TimeZoneOptions } from './time-zone-options.enum'

export function createMergedLbdateOptions(lastToNativeJsonName: string | null, options?: Partial<LbDateOptions>): LbDateOptions {
  if (options) {
    const { manualTimeZoneOffset, precision }: Partial<LbDateOptions> = options
    if (isNumber(manualTimeZoneOffset)) options.manualTimeZoneOffset = mathRound(manualTimeZoneOffset)
    if (isNumber(precision)) options.precision = mathRound(precision)
  }
  const mergedOptions = objectAssign(getDefaultLbDateConfig(), getGlobalLbDateConfig(), options) as LbDateOptions
  mergedOptions.timezone = resolveTimezone(mergedOptions.timezone)
  mergedOptions.toNativeJsonName = resolveToNativeJsonName(lastToNativeJsonName, mergedOptions.toNativeJsonName)
  mergedOptions.manualTimeZoneOffset = resolveManualTimeZoneOffset(mergedOptions.manualTimeZoneOffset)
  mergedOptions.precision = resolvePrecision(mergedOptions.precision)
  return mergedOptions
}

function resolveTimezone(timezone: TimeZoneOptions): TimeZoneOptions {
  const isValidTimezoneOption = [TimeZoneOptions.auto, TimeZoneOptions.manual, TimeZoneOptions.none, TimeZoneOptions.utc].includes(timezone)
  return isValidTimezoneOption ? timezone : TimeZoneOptions.auto
}

function resolveToNativeJsonName(lastToNativeJsonName: string | null, toNativeJsonName: string): string {
  const isNameValid = lastToNativeJsonName === toNativeJsonName || !Date.prototype.hasOwnProperty(toNativeJsonName)
  return isNameValid ? toNativeJsonName : getDefaultLbDateConfig().toNativeJsonName
}

function resolveManualTimeZoneOffset(manualTimeZoneOffset: number | null): number | null {
  if (manualTimeZoneOffset) {
    if (manualTimeZoneOffset > 840) return 840
    if (manualTimeZoneOffset < -840) return -840
  }
  return manualTimeZoneOffset
}

function resolvePrecision(precision: number): number {
  if (precision > 3) return 3
  if (precision < 0) return 0
  return precision
}
