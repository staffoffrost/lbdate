
/**
 * Date's time zone serialization options.
 */
export const enum TimeZoneOptions {
  /**
   * @example
   * "2020-04-08T05:47:13.261+03:00"
   */
  default = 'Default',
  /**
   * @example
   * "2020-04-08T05:47:13.261Z"
   */
  utc = 'UTC',
  /**
   * @example
   * "2020-04-08T05:47:13.261"
   */
  none = 'None',
  /**
   * @example
   * "2020-04-08T05:47:13.261+11:17"
   */
  manual = 'Manual',
}
