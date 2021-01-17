import { lbDate as lbDate_type, TimeZoneOptions } from 'lbdate'

describe('LbDate getReplacer():', () => {

  let lbDate: typeof lbDate_type
  let partialTestSubject: Record<string, any>
  const dateString = '2000-01-01T00:00:00.000Z'

  beforeEach(async () => {
    lbDate = (await import('module-provider')).lbDate
    partialTestSubject = {
      string: 'string',
      number: 15,
      bool: true,
    }
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if no options were provided.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.000+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    expect(JSON.stringify(testSubject, lbDate().getReplacer())).toBe(expectedResult)
  })

  it('(object) should return serialized date with timezone offset and three decimal digits precision, if no options were provided.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.000+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    expect(JSON.stringify(testSubject, lbDate.getReplacer())).toBe(expectedResult)
  })

  it('should return serialized date with timezone offset, if timezone option is set to auto.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.000+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.auto
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with UTC timezone, if timezone option is set to UTC.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: dateString,
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.utc
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with no timezone, if timezone option is set to none.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.000'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.none
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with +00:00 timezone offset, if timezone option is set to manual.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T00:00:00.000+00:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.manual
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with +00:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to null.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T00:00:00.000+00:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: null
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with +05:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to -300.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T05:00:00.000+05:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -300
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with -05:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to 300.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '1999-12-31T19:00:00.000-05:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 300
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with +14:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to -900.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T14:00:00.000+14:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -900
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with -14:00 timezone offset, if timezone option is set to manual and manual timezone offset is set to 900.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '1999-12-31T10:00:00.000-14:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: 900
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if option precision was provided with value of 3.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.000+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      precision: 3,
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with timezone offset and two decimal digits precision, if option precision was provided with value of 2.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.00+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      precision: 2,
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  // tslint:disable-next-line: max-line-length
  it('should return serialized date with timezone offset and one decimal digit precision, if option precision was provided with value of 1.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.0+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      precision: 1,
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with timezone offset and zero decimal digit precision, if option precision was provided with value of 0.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      precision: 0,
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with timezone offset and three decimal digits precision, if option precision was provided with value of 4.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.000+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      precision: 4,
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should return serialized date with timezone offset and zero decimal digit precision, if option precision was provided with value of -1.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    const replacer = lbDate({
      precision: -1,
    }).getReplacer()
    expect(JSON.stringify(testSubject, replacer)).toBe(expectedResult)
  })

  it('should call the continuation method if provided.', () => {
    const expectedResult = JSON.stringify(Object.assign(partialTestSubject, {
      date: '2000-01-01T02:00:00.000+02:00'
    }))
    const testSubject = Object.assign(partialTestSubject, {
      date: new Date(dateString)
    })
    expect.assertions((Object.keys(testSubject).length + 1) * 2 + 2)
    const replacer = jest.fn(function (this: any, key: string, value: any): any {
      if (key) {
        expect(Object.keys(testSubject).includes(key)).toBeTruthy()
        expect(Object.values(testSubject).includes(this[key])).toBeTruthy()
      } else {
        expect(value).toBe(testSubject)
        expect(this['']).toBe(testSubject)
      }
      return value
    })
    expect(JSON.stringify(testSubject, lbDate.getReplacer(replacer))).toBe(expectedResult)
    expect(replacer).toBeCalledTimes(Object.keys(testSubject).length + 1)
  })
})
