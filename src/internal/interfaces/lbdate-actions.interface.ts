import { LbDateOptions } from './lbdate-options.interface'
import { MomentLike } from './moment-like.interface'
import { MomentObj } from './moment-obj.interface'

/**
 * LbDate actions.
 */
export interface LbDateActions {
  /**
   * Overrides the native Date's toJSON method based on the global configuration.
   * - Can be provided with a Moment's object as an arguments so that Moment will use LbDate's serialization.
   * - If any options are provided to `lbDate`, they will be merged with default options and will be stored as global options.
   */
  init: (moment?: MomentObj) => void,
  /**
   * This property allows you to override a single date object's `toJSON` method.
   * - Supports Moment.
   * @example
   * const date = new Date()
   * data.toJSON = lbDate(options).toJSON
   */
  toJSON: (this: Date | MomentLike) => string
  /**
   * This method allows you to override a single date object's `toJSON` method.
   * - Supports Moment.
   * @example
   * const date = lbDate(options).override(new Date())
   */
  override: <T extends Date | MomentLike>(date: T) => T
  /**
   * This method allows you to use different serialization configurations in different sections of your app
   * - This method takes a function as a parameter, and runs it immediately based on the provided options.
   * - The provided options are temporary and are scoped only for this run.
   * - The provided options will be merged with the global and the default options.
   * - Can be provided with a Moment's object as a second argument so that moments will also be effected.
   * @example
   * lbDate(options).run(() => {
   *  result = JSON.parse(strResult)
   * })
   * // --or--
   * function parseResult(strResult) {
   *  return lbDate(options).run(() => JSON.parse(strResult))
   * }
   */
  run: <T = any>(fn: () => T, moment?: MomentObj) => T,
  /**
   * This method returns a replacer that could be user for `JSON.stringify` second argument.
   * - This replacer will handle date objects serialization using the provided options.
   * - The method accepts an optional replacer continuation method that will be called upon each replacer invoke.
   * - Supports Moment.
   */
  getReplacer: (continuation?: (key: string, value: any) => any) => (key: string, value: any) => any,
  /**
   * Undo any changes made by **LbDate().init()** to your environment.
   * - Restores the native _toJSON_ method.
   * - Restores the global options.
   * - Reverts any changes done to moment object if any.
   */
  restore: () => void,
  /**
   * Returns the current global configuration set by the last **init**.
   */
  getGlobalConfig: () => Partial<LbDateOptions>,
  /**
   * Returns the default LbDate configuration.
   */
  getDefaultConfig: () => LbDateOptions,
}
