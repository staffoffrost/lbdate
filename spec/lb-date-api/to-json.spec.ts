import { lbDate as lbDate_type, TimeZoneOptions } from 'lbdate'

describe('LbDate toJSON:', () => {

  let lbDate: typeof lbDate_type
  const dateString = '2000-01-01T00:00:00.000Z'

  beforeEach(async () => {
    lbDate = (await import('module-provider')).lbDate
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if no options were provided.', () => {
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate().toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('(object) should return serialized date with timezone offset and three decimal digits precision, if no options were provided.', () => {
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate.toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset, if timezone option is set to auto.', () => {
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.auto
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with UTC timezone, if timezone option is set to UTC.', () => {
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.utc
    }).toJSON
    expect(date.toJSON()).toBe(dateString)
  })

  it('should return serialized date with no timezone, if timezone option is set to none.', () => {
    const expectedDateString = '2000-01-01T02:00:00.000'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.none
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +00:00 timezone offset, if timezone option is set to manual.', () => {
    const expectedDateString = '2000-01-01T00:00:00.000+00:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.manual
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +00:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to null.', () => {
    const expectedDateString = '2000-01-01T00:00:00.000+00:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: null
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +05:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to -300.', () => {
    const expectedDateString = '2000-01-01T05:00:00.000+05:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -300
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with -05:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to 300.', () => {
    const expectedDateString = '1999-12-31T19:00:00.000-05:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 300
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with +14:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to -900.', () => {
    const expectedDateString = '2000-01-01T14:00:00.000+14:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -900
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with -14:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to 900.', () => {
    const expectedDateString = '1999-12-31T10:00:00.000-14:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 900
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if option precision was provided with value of 3.', () => {
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      precision: 3,
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and two decimal digits precision, if option precision was provided with value of 2.', () => {
    const expectedDateString = '2000-01-01T02:00:00.00+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      precision: 2,
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  // tslint:disable-next-line: max-line-length
  it('should return serialized date with timezone offset and one decimal digit precision, if option precision was provided with value of 1.', () => {
    const expectedDateString = '2000-01-01T02:00:00.0+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      precision: 1,
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and zero decimal digit precision, if option precision was provided with value of 0.', () => {
    const expectedDateString = '2000-01-01T02:00:00+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      precision: 0,
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if option precision was provided with value of 4.', () => {
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      precision: 4,
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })

  it('should return serialized date with timezone offset and zero decimal digit precision, if option precision was provided with value of -1.', () => {
    const expectedDateString = '2000-01-01T02:00:00+02:00'
    const date = new Date(dateString)
    date.toJSON = lbDate({
      precision: -1,
    }).toJSON
    expect(date.toJSON()).toBe(expectedDateString)
  })
})
