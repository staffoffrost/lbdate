import { lbDate as lbDateFunc, TimeZoneOptions } from 'lbdate'

describe('LbDate restore():', () => {

  let lbDate: typeof lbDateFunc

  beforeEach(async () => {
    lbDate = (await import('module-provider')).lbDate
  })

  afterEach(() => {
    lbDate().restore()
    jest.resetModules()
  })

  it('should restore global configuration to an empty object.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 840,
      toNativeJsonName: 'anotherToNativeJSON',
      precision: 0,
    }).init()
    lbDate().restore()
    const config = lbDate().getGlobalConfig()
    expect(config).toStrictEqual({})
  })

  it('(object) should restore global configuration to an empty object.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 840,
      toNativeJsonName: 'anotherToNativeJSON',
      precision: 0,
    }).init()
    lbDate.restore()
    const config = lbDate().getGlobalConfig()
    expect(config).toStrictEqual({})
  })

  it('should restore the native toJSON method.', () => {
    lbDate().init()
    lbDate().restore()
    const toNativeJsonName = lbDate().getDefaultConfig().toNativeJsonName
    expect(Date.prototype[toNativeJsonName]).toBeFalsy()
  })

  it('should restore the native toJSON serialization.', () => {
    lbDate().init()
    lbDate().restore()
    const expectedDateString = '2000-01-01T00:00:00.000Z'
    const date = new Date(expectedDateString)
    expect(date.toJSON()).toBe(expectedDateString)
  })
})
