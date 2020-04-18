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
   * Sets the provided or default options to global configuration
   * and then overrides the native toJSON method based on the given options.
   */
  init: () => void,
  /**
   * This method takes a function as a parameter, and runs it immediately with the provided options.
   * The provided options are temporary and are scoped only for this run.
   * The provided options will be merged with the global and the default options.
   * Use this method if you want to use different time zone preferences for different sections in your app.
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
   * Restores the native _toJSON_ method,
   * removes the global configurations,
   * and basicity should undo any changes to your environment done by **LbDate().init()**.
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
