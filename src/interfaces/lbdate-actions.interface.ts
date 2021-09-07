import { LbDateOptions } from './lbdate-options.interface'
import { MomentLike } from './moment-like.interface'

export interface Run {
  (fn: () => void): void,
  (fn: () => string): string,
}

export interface MomentObj {
  prototype: {
    toDate: (this: any) => Date,
  }
}

/**
 * LbDate actions.
 */
export interface LbDateActions {
  /**
   * Sets the global configuration based on the provided options merged with LbDate defaults.
   * Then overrides the native Date's toJSON method based on the global configuration.
   */
  init: (moment?: MomentObj) => void,
  /**
   * This property allows you to override a single date object's `toJSON` method.
   * @example
   * const date = new Date()
   * data.toJSON = lbDate(options).toJSON
   */
  toJSON: (this: Date | MomentLike) => string
  /**
   * This method allows you to override a single date object's `toJSON` method.
   * @example
   * const date = lbDate(options).override(new Date())
   */
  override: <T extends Date | MomentLike>(date: T) => T
  /**
   * This method allows you to use different serialization configurations in different sections of your app
   * - This method takes a function as a parameter, and runs it immediately based on the provided options.
   * - The provided options are temporary and are scoped only for this run.
   * - The provided options will be merged with the global and the default options.
   * @example
   * lbDate(options).run(() => {
   *  result = JSON.parse(strResult)
   * })
   * // --or--
   * function parseResult(strResult) {
   *  return lbDate(options).run(() => JSON.parse(strResult))
   * }
   */
  run: Run,
  /**
   * This method returns a replacer that could be user for `JSON.stringify` second argument.
   * - This replacer will handle date objects serialization using the provided options.
   * - The method accepts an optional replacer continuation method that will be called upon each replacer invoke.
   */
  getReplacer: (continuation?: (key: string, value: any) => any) => (key: string, value: any) => any,
  /**
   * Undo any changes made by **LbDate().init()** to your environment.
   * - Restores the native _toJSON_ method.
   * - Removes the global options.
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
