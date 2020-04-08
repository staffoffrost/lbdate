import { LbDateMethods } from './lbdate-methods'
import { cloneFunction, toJson } from './functions'
import { getDefaultLbDateConfig, LbDateOptions, getGlobalLbDateConfig, setGlobalLbDateOptions } from './config'

let lastOriginalToJsonName: string | null = null

export function lbDate(): LbDateMethods
export function lbDate(options: Partial<LbDateOptions>): LbDateMethods
export function lbDate(options?: Partial<LbDateOptions>): LbDateMethods {
	const mergedOptions = Object.assign(getDefaultLbDateConfig(), getGlobalLbDateConfig(), options)
	const originalToJsonName = mergedOptions.originalToJsonName
	mergedOptions.precision = mergedOptions.precision > 3 ? 3 : mergedOptions.precision < 0 ? 0 : mergedOptions.precision
	const resetToJsonFunctions = () => {
		if (lastOriginalToJsonName) {
			Date.prototype.toJSON = Date.prototype[lastOriginalToJsonName]
			delete Date.prototype[lastOriginalToJsonName]
			lastOriginalToJsonName = null
		}
	}
	return {
		init: () => {
			resetToJsonFunctions()
			lastOriginalToJsonName = originalToJsonName
			setGlobalLbDateOptions(mergedOptions)
			Date.prototype[originalToJsonName] = cloneFunction(Date.prototype.toJSON)
			Date.prototype.toJSON = toJson(mergedOptions)
		},
		run: <T = string | void>(fn: () => T): T => {
			const clonedToJson = cloneFunction(Date.prototype.toJSON) as (key?: any) => string
			let wasOriginalToJsonCopied = false
			if (!Date.prototype[originalToJsonName]) {
				Date.prototype[originalToJsonName] = clonedToJson
				wasOriginalToJsonCopied = true
			}
			Date.prototype.toJSON = toJson(mergedOptions)
			let error: Error | null = null
			let jsonString: T
			try {
				jsonString = fn()
			} catch (e) {
				error = e
			}
			Date.prototype.toJSON = clonedToJson
			if (wasOriginalToJsonCopied) {
				delete Date.prototype[originalToJsonName]
			}
			if (error) throw error
			return jsonString!
		},
		destroy: () => {
			resetToJsonFunctions()
			setGlobalLbDateOptions({})
		},
		getGlobalConfig: () => getGlobalLbDateConfig(),
		getDefaultConfig: () => getDefaultLbDateConfig(),
	}
}
