import { lbDate, LbDate } from 'lbdate'
import { cloneFunction } from '../src/functions'

describe('cloneFunction():', () => {

  it('should clone function and all its properties.', () => {
    const clonedLbDate: LbDate = cloneFunction(lbDate) as LbDate
    expect(clonedLbDate).not.toBe(lbDate)
    clonedLbDate().init()
    const date = new Date('2000-01-01T00:00:00.000Z')
    const expectedDateString = '2000-01-01T02:00:00.000+02:00'
    expect(date.toJSON()).toBe(expectedDateString)
  })
})
