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
   * Sets the global configuration based on the provided options merged with LbDate defaults.
   * Then overrides the native Date's toJSON method based on the global configuration.
   */
  init: () => void,
  /**
   * Uses different serialization configurations in different sections in your app.
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
   * Undo any changes made by **LbDate().init()** to your environment.
   * - Restores the native _toJSON_ method.
   * - Removes the global options
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
