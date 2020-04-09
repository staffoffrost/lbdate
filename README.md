# LbDate - _beta version_

JavaScript Date object ISO 8601 serialization helper. Provides an easy way of automatically adding time zone while JavaScript serializes your objects.

ISO 8601 standards are supported by all current apis, including: Node.JS, DotNet, Java and more. You can read about it here: <https://en.wikipedia.org/wiki/ISO_8601>

## Installation

    npm i lbdate

## Example

Native serialization (UTC):

    const myObj = {
        date: new Date()
    }

    const myStringObj = JSON.stringify(myObj)

    console.log(myStringObj)

    // {"date":"2020-04-01T00:00:00.000Z"}

LbDate serialization (+TimeZoneOffset):

    lbDate().init()

    const myObj = {
        date: new Date()
    }

    const myStringObj = JSON.stringify(myObj)

    console.log(myStringObj)

    // {"date":"2020-04-01T03:00:00.000+03:00"}

## Why This Package Exist

- Your old db stores local time and the client is sending you UTC dates.
- You may want to send date time offset with the date itself and avoid work around with headers, interceptors and unnecessary server side logic.
- Basically you want to be in control about what JavaScript is doing with your dates when it stringifies them.

## How It Works

LbDate will clone the native toJSON method to newly defined originalToJSON method on the Date object's prototype. Then it will override the native toJSON method based on the given options.

## Documentation

### Initialization

    import { lbDate } from 'lbdate'

    lbDate({ precision: 0 }).init()

### Options

    interface LbDateOptions {
      timezone: TimeZoneOptions
      manualTimeZoneOffset: number | null
      originalToJsonName: string
      precision: number
    }

    const enum TimeZoneOptions {
      auto = 'Auto',
      utc = 'UTC',
      none = 'None',
      manual = 'Manual',
    }

- **timezone**: {\*\*TimeZoneOptions or string} Allows you to configure time zone presences.
  - **auto**: (default) Will add time zone offset to date's ISO string based on host's environment time zone. \*"2020-04-01T03:30:15.123+03:00"
  - **UTC**: Will add the _\*\*'Z' letter to the end of the ISO string. This is actually the default of a JavaScript. _"2020-04-01T00:30:15.123Z"
  - **none**: Will remove the _\*\*'Z' symbol from the end of the ISO string and will not add any time zone to it. _"2020-04-01T03:30:15.123"
  - **manual**: Will allow you to set the time zone manually using **manualTimeZoneOffset** option.
- **manualTimeZoneOffset**: {number} (default = null) (range: **-840** - **840**) Allows you to configure manually the preferred time zone offset in **Minutes**. For example: -90 minutes will result: \*"2020-04-01T02:00:15.123+01:30"
- **originalToJsonName**: {string} (default = 'originalToJSON') While LbDate is initializing, it will clone the native **toJSON** method to this given name and will store it on the Date prototype so you can still access the original method in you app if you need to. \*\*\*\*
- **precision**: {number} (default = 3) (range: **0** - **3**) The number of second fraction digits. For example: the value 2 will result: \*"2020-04-01T03:30:15.12+03:00"

\* Date used: Wed Apr 01 2020 03:30:15 GMT+0300 (Israel Daylight Time) {}

\*\* If you are not using TypeScript, you can configure TimeZoneOptions using just string, like so: 'Auto', 'UTC', 'None' or 'Manual'.

\*\*\* The 'Z' letter at the end of a date's ISO string symbols UTC time.

\*\*\*\* If you want to access the original toJSON method with it's new name and you are using TypeScript, you should create a declaration file in your main projects folder. Like so:

// ./src/original-to-json.d.ts

    declare global {
      interface Date {
        toOriginalJSON(this: Date): string
      }
    }

    export { }

### Scoped Run

    lbDate(options).run(() => {
      result = JSON.parse(strResult)
    })

or:

    function parseResult(strResult) {
      return lbDate(options).run(() => JSON.parse(strResult))
    }

### Get Current Configurations

Get current global configuration that was set by the last init.

    lbDate().getGlobalConfig()

Get default configuration:

    lbDate().getDefaultConfig()

### Restore

Undo all changes done to your environment by **lbDate().init()**.

    lbDate().restore()

## Browser Support

- Support guaranteed for all current major browsers that were updated in the last 2 years.
- Support for ES5 may be added later as a different package or alternate imports paths may be provided.

> _Details_ The code is compiled to ES9 (EcmaScript 2018) to reduce the chance of unnecessary performance hit while still providing support for all versions of all major browsers from the last 2 years. If you need older browser support, you may need to recompile the code with TypeScript or Babel compiler to an older version. Currently ES6 (EcmaScript 2015) will work just fine, but recompiling to ES5 will not work if you need to support IE.
