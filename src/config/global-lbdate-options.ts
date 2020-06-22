import { objectAssign } from '../functions'
import { LbDateOptions } from '../interfaces'

let globalLbDateOptions: Partial<LbDateOptions> = {}

export function setGlobalLbDateOptions(options: Partial<LbDateOptions>): void {
  globalLbDateOptions = options
}

export function getGlobalLbDateConfig(): Partial<LbDateOptions> {
  return objectAssign({}, globalLbDateOptions)
}
