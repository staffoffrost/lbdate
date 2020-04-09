import { lbDate, TimeZoneOptions } from 'lbdate'

lbDate({ timezone: TimeZoneOptions.manual, manualTimeZoneOffset: -90 }).init()
console.log(new Date('2020-04-01T00:30:15.123Z').toJSON())

console.log('From run:')

lbDate({ timezone: TimeZoneOptions.auto }).run(() => {
  console.log(JSON.stringify({ date: new Date() }))
})

console.log(new Date().toJSON())
