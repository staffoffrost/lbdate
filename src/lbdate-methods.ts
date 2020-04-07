import { LbDateOptions } from './config/lbdate-options'

export interface LbDateMethods {
	run: (fn: () => string) => string,
	init: () => void,
	destroy: () => void,
	getGlobalConfig: () => Partial<LbDateOptions>,
	getDefaultConfig: () => LbDateOptions,
}
