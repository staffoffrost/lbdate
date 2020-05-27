import { lbDate as lbDateFunc, LbDateOptions, TimeZoneOptions } from 'lbdate'

describe('LbDate getDefaultConfig():', () => {

  let lbDate: typeof lbDateFunc

  beforeEach(async () => {
    lbDate = (await import('./module-provider')).lbDate
  })

  afterEach(() => {
    lbDate().restore()
    jest.resetModules()
  })

  it("should return empty object if LbDate wasn't initialized first.", () => {
    const config = lbDate().getGlobalConfig()
    expect(config).toStrictEqual({})
  })

  it('should return the default configuration if not options were provided during initialization of LbDate.', () => {
    lbDate().init()
    const config = lbDate().getGlobalConfig()
    const expectedConfig: LbDateOptions = {
      timezone: TimeZoneOptions.auto,
      manualTimeZoneOffset: null,
      toNativeJsonName: 'toNativeJSON',
      precision: 3,
    }
    expect(config).toStrictEqual(expectedConfig)
  })

  it('should return the provided options as global configuration.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 840,
      toNativeJsonName: 'anotherToNativeJSON',
      precision: 0,
    }).init()
    const config = lbDate().getGlobalConfig()
    const expectedConfig: LbDateOptions = {
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 840,
      toNativeJsonName: 'anotherToNativeJSON',
      precision: 0,
    }
    expect(config).toStrictEqual(expectedConfig)
  })

  it('should return the merged options as global configuration.', () => {
    lbDate({
      timezone: TimeZoneOptions.utc,
      manualTimeZoneOffset: null,
      toNativeJsonName: 'toNativeJSON',
      precision: 3,
    }).init()
    let config = lbDate().getGlobalConfig()
    const expectedConfig: LbDateOptions = {
      timezone: TimeZoneOptions.utc,
      manualTimeZoneOffset: null,
      toNativeJsonName: 'toNativeJSON',
      precision: 3,
    }
    expect(config).toStrictEqual(expectedConfig)
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 840,
      toNativeJsonName: 'toNativeJSON',
      precision: 3,
    }).init()
    config = lbDate().getGlobalConfig()
    expectedConfig.timezone = TimeZoneOptions.manual
    expectedConfig.manualTimeZoneOffset = 840
    expect(config).toStrictEqual(expectedConfig)
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 840,
      toNativeJsonName: 'anotherToNativeJSON',
      precision: 3,
    }).init()
    config = lbDate().getGlobalConfig()
    expectedConfig.toNativeJsonName = 'anotherToNativeJSON'
    expect(config).toStrictEqual(expectedConfig)
  })

  it('should not set an invalid timezone option.', () => {
    lbDate({
      timezone: 'Test' as TimeZoneOptions,
    }).init()
    const config = lbDate().getGlobalConfig()
    const expectedConfig: LbDateOptions = {
      timezone: TimeZoneOptions.auto,
      manualTimeZoneOffset: null,
      toNativeJsonName: 'toNativeJSON',
      precision: 3,
    }
    expect(config).toStrictEqual(expectedConfig)
  })

  it('should not set an invalid manualTimeZoneOffset option.', () => {
    lbDate({
      manualTimeZoneOffset: 841,
    }).init()
    let config = lbDate().getGlobalConfig()
    const expectedConfig: LbDateOptions = {
      timezone: TimeZoneOptions.auto,
      manualTimeZoneOffset: 840,
      toNativeJsonName: 'toNativeJSON',
      precision: 3,
    }
    expect(config).toStrictEqual(expectedConfig)
    lbDate({
      manualTimeZoneOffset: -841,
    }).init()
    config = lbDate().getGlobalConfig()
    expectedConfig.manualTimeZoneOffset = -840
    expect(config).toStrictEqual(expectedConfig)
  })

  it('should not set an invalid toNativeJsonName option.', () => {
    lbDate({
      toNativeJsonName: 'toISOString',
    }).init()
    const config = lbDate().getGlobalConfig()
    const expectedConfig: LbDateOptions = {
      timezone: TimeZoneOptions.auto,
      manualTimeZoneOffset: null,
      toNativeJsonName: 'toNativeJSON',
      precision: 3,
    }
    expect(config).toStrictEqual(expectedConfig)
  })

  it('should not set an invalid precision option.', () => {
    lbDate({
      precision: 4,
    }).init()
    let config = lbDate().getGlobalConfig()
    const expectedConfig: LbDateOptions = {
      timezone: TimeZoneOptions.auto,
      manualTimeZoneOffset: null,
      toNativeJsonName: 'toNativeJSON',
      precision: 3,
    }
    expect(config).toStrictEqual(expectedConfig)
    lbDate({
      precision: -1,
    }).init()
    config = lbDate().getGlobalConfig()
    expectedConfig.precision = 0
    expect(config).toStrictEqual(expectedConfig)
  })
})
