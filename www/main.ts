import { lbDate, TimeZoneOptions } from 'lbdate'


lbDate({ serialization: TimeZoneOptions.utc, manualTimeZoneOffset: 10 }).init()
console.log(lbDate().getDefaultConfig())
