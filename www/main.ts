import { lbDate, TimeZoneOptions } from 'lbdate'

lbDate().init()
console.log(new Date().toJSON())

console.log('From run:')

lbDate({ timezone: TimeZoneOptions.default }).run(() => {
  console.log(JSON.stringify({ date: new Date() }))
})

console.log(new Date().toJSON())
