import { LbDateOptions } from '../config'

export function toJson(options: LbDateOptions): (this: Date) => string {
	console.log(options)
	return function (this: Date): string {
		return 'Test'
	}
}
