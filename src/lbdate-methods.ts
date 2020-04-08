import { LbDateOptions } from './config/lbdate-options'

export interface Run {
	(fn: () => void): void,
	(fn: () => string): string,
}

export interface LbDateMethods {
	run: Run,
	init: () => void,
	destroy: () => void,
	getGlobalConfig: () => Partial<LbDateOptions>,
	getDefaultConfig: () => LbDateOptions,
}
