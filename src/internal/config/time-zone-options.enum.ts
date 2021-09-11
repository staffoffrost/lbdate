
/**
 * Date's time zone serialization options.
 */
export const enum TimeZoneOptions {
  /**
   * @example
   * "2020-04-01T03:30:15.123+03:00"
   */
  auto = 'Auto',
  /**
   * @example
   * "2020-04-01T00:30:15.123Z"
   */
  utc = 'UTC',
  /**
   * @example
   * "2020-04-01T03:30:15.123"
   */
  none = 'None',
  /**
   * Allow you to set manual time zone using **manualTimeZoneOffset** option.
   */
  manual = 'Manual',
}
