import { LbDateMethods } from './lbdate-methods'
import { cloneFunction, toJson } from './functions'
import { getDefaultLbDateConfig, LbDateOptions, getGlobalLbDateConfig, setGlobalLbDateOptions } from './config'

let lastOriginalToJsonName: string | null = null

export function lbDate(): LbDateMethods
export function lbDate(options: Partial<LbDateOptions>): LbDateMethods
export function lbDate(options?: Partial<LbDateOptions>): LbDateMethods {
	const mergedOptions = Object.assign(getDefaultLbDateConfig(), getGlobalLbDateConfig(), options)
	const resetToJsonFunctions = () => {
		if (lastOriginalToJsonName) {
			Date.prototype.toJSON = Date.prototype[lastOriginalToJsonName]
			delete Date.prototype[lastOriginalToJsonName]
		}
	}
	return {
		init: () => {
			resetToJsonFunctions()
			lastOriginalToJsonName = mergedOptions.originalToJsonName
			setGlobalLbDateOptions(mergedOptions)
			Date.prototype[mergedOptions.originalToJsonName] = cloneFunction(Date.prototype.toJSON)
			Date.prototype.toJSON = toJson(mergedOptions)
		},
		run: (fn: () => string) => fn(),
		destroy: () => {
			resetToJsonFunctions()
			lastOriginalToJsonName = null
			setGlobalLbDateOptions({})
		},
		getGlobalConfig: () => getGlobalLbDateConfig(),
		getDefaultConfig: () => getDefaultLbDateConfig(),
	}
}
