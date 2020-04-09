import { LbDateOptions } from './config/lbdate-options'

export interface Run {
  (fn: () => void): void,
  (fn: () => string): string,
}

/**
 * LbDate actions.
 */
export interface LbDateActions {
  /**
   * Sets the default or the provided options as the global configuration
   * and then override the native toJSON method based on the given options.
   */
  init: () => void,
  /**
   * This method takes a function as a parameter, and runs it immediately with the provided options.
   * The provided options will be temporary and scoped only for this method.
   * The provided options will be merged with the global and the default ones.
   * Use this method if you want to use different Date's serialization for different parts of your app.
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
   * * Restores native toJSON.
   * * Restores the global configurations.
   * * And basicity should undo any changes to your environment done by LbDate().init().
   */
  restore: () => void,
  /**
   * Returns current global configurations.
   */
  getGlobalConfig: () => Partial<LbDateOptions>,
  /**
   * Returns the default configurations.
   */
  getDefaultConfig: () => LbDateOptions,
}
