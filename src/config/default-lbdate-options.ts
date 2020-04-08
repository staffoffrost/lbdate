import { LbDateOptions } from './lbdate-options'
import { TimeZoneOptions } from './time-zone-options.enum'
import { objectAssign } from '../functions'

const DEFAULT_LBDATE_OPTIONS: LbDateOptions = {
	serialization: TimeZoneOptions.auto,
	manualTimeZoneOffset: null,
	originalToJsonName: 'originalToJSON',
	precision: 3,
}

export function getDefaultLbDateConfig(): LbDateOptions {
	return objectAssign({}, DEFAULT_LBDATE_OPTIONS)
}
