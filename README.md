# LbDate - _beta version_

JavaScript Date's serialization helper. Provides an easy way of automatically adding time zone while JavaScript serializes your date objects.

LbDate and native JavaScript date's serialization make use of ISO 8601 standards. You may read about it here: <https://en.wikipedia.org/wiki/ISO_8601>

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

### [Click here to check our **Playground**.](https://staff-of-frost.web.app/playgrounds/lbdate/)

## Why This Package Exist

- You have an old db that stores local time and the client is sending you UTC dates.
- You may want to send date time offset with the date itself and avoid work around with headers, interceptors or unnecessary server side logic.
- Basically you want to be in control about what JavaScript is doing with your dates when it stringifies them.

## How It Works

LbDate will clone the native toJSON method to newly defined toNativeJSON method on the Date's object prototype. Then it will override the native toJSON method based on the given options.

## Documentation

### Initialization

    import { lbDate } from 'lbdate'

    lbDate({ precision: 0 }).init()

### Options

    interface LbDateOptions {
      timezone: TimeZoneOptions
      manualTimeZoneOffset: number | null
      toNativeJsonName: string
      precision: number
    }

    const enum TimeZoneOptions {
      auto = 'Auto',
      utc = 'UTC',
      none = 'None',
      manual = 'Manual',
    }

- **timezone**: {\*TimeZoneOptions or string} Allows you to configure time zone related preferences.
  - **auto**: (default) Will add time zone offset to date's ISO string based on client's time zone. \*\*"2020-04-01T03:30:15.123+03:00"
  - **UTC**: Will keep the \*\*\*'Z' letter at the end of the ISO string. This is actually the default behavior of JavaScript. \*\*"2020-04-01T00:30:15.123Z"
  - **none**: Will remove the \*\*\*'Z' symbol from the end of the ISO string and will not add any time zone to it. \*\*"2020-04-01T03:30:15.123"
  - **manual**: Will allow you to set the time zone manually using _manualTimeZoneOffset_ option.
- **manualTimeZoneOffset**: {number} (default = null) (range: **-840** - **840**) Allows you to configure manually the time zone offset from UTC in **Minutes**. For example: -90 minutes will result: \*\*"2020-04-01T02:00:15.123+01:30"
- **toNativeJsonName**: {string} (default = 'toNativeJSON') While LbDate is initializing, it will clone the native _toJSON_ method to this given name and will store it on the Date's prototype so you can still access the original method in your app if you need to. \*\*\*\*
- **precision**: {number} (default = 3) (range: **0** - **3**) The number of second fraction digits. For example, the value 2 will result: \*\*"2020-04-01T03:30:15.12+03:00"

\* If you are not using TypeScript, you can configure TimeZoneOptions using strings. Like so: 'Auto', 'UTC', 'None' or 'Manual'.

\*\* Date used: Wed Apr 01 2020 03:30:15 GMT+0300 (Israel Daylight Time) {}

\*\*\* The 'Z' letter at the end of a date's ISO string symbols UTC time.

\*\*\*\* If you want to access the _toNativeJSON_ method and you are using TypeScript, you can create a declaration file in your main project's folder. Like so:

// ./src/global.d.ts

    declare global {
      interface Date {
        toNativeJSON(this: Date): string
      }
    }

    export { }

### Scoped Run

The run method takes a function as a parameter and runs it immediately with the provided options.

- The provided options are temporary and are scoped only for this run.
- The provided options will be merged with the global and the default options.
- Use this method if you want to use different time zone preferences for different sections in your app.

Example:

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

Undo all changes done to your environment by _lbDate().init()_.

    lbDate().restore()

## Browser Support

- Support guaranteed for all current major browsers that were updated in the last 2 years.
- Support for ES5 may be added later as a different package or alternate imports paths may be provided.

> _Details_ The code is compiled to ES9 (EcmaScript 2018) to reduce the chance of unnecessary performance hit while still providing support for all versions of all major browsers from the last 2 years. If you need older browser support, you may need to recompile the code with TypeScript or Babel compiler to an older version.
