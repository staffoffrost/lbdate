import { LbDateActions } from './lbdate-actions.interface'
import { LbDateOptions } from './lbdate-options.interface'

export interface LbDate extends LbDateActions {
  /**
   * Will set the default options for date's serialization.
   * @example
   * lbDate().init()
   * // --or--
   * lbDate().run(() => {
   *  // Your code here...
   * })
   * @default
   * options = {
   *  serialization: TimeZoneOptions.auto,
   *  manualTimeZoneOffset: null,
   *  toNativeJsonName: 'toNativeJSON',
   *  precision: 3
   * }
   */
  (): LbDateActions,
  /**
   * Will set the provided options for date's serialization merged with defaults.
   * @example
   * lbDate(options).init()
   * // --or--
   * lbDate(options).run(() => {
   *  // Your code here...
   * })
   * @default
   * options = {
   *  serialization: TimeZoneOptions.auto,
   *  manualTimeZoneOffset: null,
   *  toNativeJsonName: 'toNativeJSON',
   *  precision: 3
   * }
   */
  (options: Partial<LbDateOptions>): LbDateActions,
  // (options?: Partial<LbDateOptions>): LbDateActions,
}
