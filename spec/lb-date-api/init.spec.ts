import { lbDate as lbDate_type, TimeZoneOptions } from 'lbdate'
import moment_type from 'moment'

describe('LbDate init():', () => {

  let lbDate: typeof lbDate_type
  let moment: typeof moment_type
  const dateString = '2000-01-01T00:00:00.000Z'

  beforeEach(async () => {
    const provider = await import('module-provider')
    lbDate = provider.lbDate
    moment = provider.moment
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if no options were provided.', () => {
    lbDate().init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('(object) should return serialized date with timezone offset and three decimal digits precision, if no options were provided.', () => {
    lbDate.init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset, if timezone option is set to auto.', () => {
    lbDate({
      timezone: TimeZoneOptions.auto
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with UTC timezone, if timezone option is set to UTC.', () => {
    lbDate({
      timezone: TimeZoneOptions.utc
    }).init()
    const date = new Date(dateString)
    expect(date.toJSON()).toBe(dateString)
  })

  it('should return serialized date with no timezone, if timezone option is set to none.', () => {
    lbDate({
      timezone: TimeZoneOptions.none
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +00:00 timezone offset, if timezone option is set to manual.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T00:00:00.000+00:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +00:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to null.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: null
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T00:00:00.000+00:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +05:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to -300.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -300
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T05:00:00.000+05:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with -05:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to 300.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 300
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '1999-12-31T19:00:00.000-05:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +14:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to -900.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -900
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T14:00:00.000+14:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with -14:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to 900.', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 900
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '1999-12-31T10:00:00.000-14:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if option precision was provided with value of 3.', () => {
    lbDate({
      precision: 3,
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and two decimal digits precision, if option precision was provided with value of 2.', () => {
    lbDate({
      precision: 2,
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.00+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  // tslint:disable-next-line: max-line-length
  it('should return serialized date with timezone offset and one decimal digit precision, if option precision was provided with value of 1.', () => {
    lbDate({
      precision: 1,
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.0+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and zero decimal digit precision, if option precision was provided with value of 0.', () => {
    lbDate({
      precision: 0,
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if option precision was provided with value of 4.', () => {
    lbDate({
      precision: 4,
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and zero decimal digit precision, if option precision was provided with value of -1.', () => {
    lbDate({
      precision: -1,
    }).init()
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if no options were provided. +moment', () => {
    lbDate().init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  // tslint:disable-next-line: max-line-length
  it('(object) should return serialized date with timezone offset and three decimal digits precision, if no options were provided. +moment', () => {
    lbDate.init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset, if timezone option is set to auto. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.auto
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with UTC timezone, if timezone option is set to UTC. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.utc
    }).init(moment)
    const date = new Date(dateString)
    expect(moment(date).toJSON()).toBe(dateString)
  })

  it('should return serialized date with no timezone, if timezone option is set to none. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.none
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +00:00 timezone offset, if timezone option is set to manual. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.manual
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T00:00:00.000+00:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +00:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to null. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: null
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T00:00:00.000+00:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +05:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to -300. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -300
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T05:00:00.000+05:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with -05:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to 300. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 300
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '1999-12-31T19:00:00.000-05:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +14:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to -900. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -900
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T14:00:00.000+14:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with -14:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to 900. +moment', () => {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 900
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '1999-12-31T10:00:00.000-14:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if option precision was provided with value of 3. +moment', () => {
    lbDate({
      precision: 3,
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and two decimal digits precision, if option precision was provided with value of 2. +moment', () => {
    lbDate({
      precision: 2,
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.00+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  // tslint:disable-next-line: max-line-length
  it('should return serialized date with timezone offset and one decimal digit precision, if option precision was provided with value of 1. +moment', () => {
    lbDate({
      precision: 1,
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.0+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and zero decimal digit precision, if option precision was provided with value of 0. +moment', () => {
    lbDate({
      precision: 0,
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if option precision was provided with value of 4. +moment', () => {
    lbDate({
      precision: 4,
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and zero decimal digit precision, if option precision was provided with value of -1. +moment', () => {
    lbDate({
      precision: -1,
    }).init(moment)
    const date = new Date(dateString)
    const expectedDateString = '2000-01-01T02:00:00+02:00'
    expect(moment(date).toJSON()).toBe(expectedDateString)
  })
})
