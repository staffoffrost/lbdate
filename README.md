# LbDate

JavaScript Date's serialization helper. Provides an easy way of automatically adding time zone while JavaScript serializes date objects.

LbDate and native JavaScript date's serialization, both make use of ISO 8601 standards. You can read about it here: <https://en.wikipedia.org/wiki/ISO_8601>.

## New Features

1. `lbDate` will also behave now as an object. So, if you don't need to pass any options, you can call the actions like this:

   ```typescript
   lbDate.init();
   ```

2. `lbDate` is now also exported as default, so you can import it like this:

   ```typescript
   import myCustomName from "lbdate";
   // or
   import { lbDate } from "lbdate";
   ```

## Installation

```bach
npm i lbdate
```

## CDN

| URL                                                                       | ES     | Minified |
| ------------------------------------------------------------------------- | ------ | -------- |
| <https://cdn.jsdelivr.net/npm/lbdate@1.1.0/bundles/lbdate.umd.js>         | ES2015 | No       |
| <https://cdn.jsdelivr.net/npm/lbdate@1.1.0/bundles/lbdate.umd.min.js>     | ES2015 | Yes      |
| <https://cdn.jsdelivr.net/npm/lbdate@1.1.0/bundles/lbdate.umd.es5.js>     | ES5    | No       |
| <https://cdn.jsdelivr.net/npm/lbdate@1.1.0/bundles/lbdate.umd.es5.min.js> | ES5    | Yes      |

## Example

Native serialization:

```typescript
const myObj = {
  date: new Date(),
};

const myStringObj = JSON.stringify(myObj);

console.log(myStringObj);

// {"date":"2020-04-01T00:00:00.000Z"}
```

LbDate serialization:

```typescript
lbDate.init();

const myObj = {
  date: new Date(),
};

const myStringObj = JSON.stringify(myObj);

console.log(myStringObj);

// {"date":"2020-04-01T03:00:00.000+03:00"}
```

## Playground

### [Click here to check our Playground.](https://lbdate-dev.web.app/playground/)

## Why This Package Exist

- You may have an old DB that stores local time and the client is sending you UTC dates.
- You may want to send date time offset with the date itself and avoid work around with http headers, interceptors or boilerplate server side code.
- You may just want to be in control about what JavaScript is doing with your dates when it stringifies them.

## How It Works

LbDate will clone the native toJSON method to the newly defined toNativeJSON method name (can be changed) on the Date's object prototype. Then it will override the native toJSON method based on the given options.

## Documentation

### Initialization

```typescript
import lbDate from "lbdate";

lbDate({
  precision: 0,
}).init();
```

### Options

```typescript
interface LbDateOptions {
  timezone: TimeZoneOptions;
  manualTimeZoneOffset: number | null;
  toNativeJsonName: string;
  precision: number;
}

const enum TimeZoneOptions {
  auto = "Auto",
  utc = "UTC",
  none = "None",
  manual = "Manual",
}
```

- **timezone**: `{TimeZoneOptions or string}` Allows you to configure time zone related preferences. _Note:_ If you are not using TypeScript, you can configure `TimeZoneOptions` using strings. Like so: 'Auto', 'UTC', 'None' or 'Manual'.
  - **auto**: (default) Will add time zone offset to date's ISO string based on client's time zone. \*"2020-04-01T03:30:15.123+03:00"
  - **UTC**: Will keep the \*\*'Z' letter at the end of the ISO string. This is actually the default behavior of JavaScript. \*"2020-04-01T00:30:15.123Z"
  - **none**: Will remove the \*\*'Z' symbol from the end of the ISO string and will not add any time zone to it. \*"2020-04-01T03:30:15.123"
  - **manual**: Will allow you to set the time zone manually using `manualTimeZoneOffset` option.
- **manualTimeZoneOffset**: `{number}` (default = null) (range: -840 to 840) Allows you to configure manually the time zone offset in **minutes**. The value should represent the number of minutes you need to add or subtract to reach UTC time. For example: -90 minutes will result: \*"2020-04-01T02:00:15.123+01:30"
- **toNativeJsonName**: `{string}` (default = 'toNativeJSON') While LbDate is initializing, it will clone the native _toJSON_ method to this given name and will store it on the Date's prototype so you can still access the original method in your app if you need to. \*\*\*
- **precision**: `{number}` (default = 3) (range: 0 to 3) The number of second fraction digits. For example, the value 2 will result: \*"2020-04-01T03:30:15.12+03:00"

_\* Date used: `Wed Apr 01 2020 03:30:15 GMT+0300 (Israel Daylight Time) {}`._

_\*\* The 'Z' letter at the end of a date's ISO string symbols UTC time._

_\*\*\* If you want to access the `toNativeJSON` method and you are using TypeScript, you can create a declaration file in your main project's folder. Like so:_

`src/global.d.ts`

```typescript
declare global {
  interface Date {
    toNativeJSON(this: Date): string;
  }
}

export {};
```

### Scoped Run

This method allows to use different serialization configurations in different sections of your app.

- This method takes a function as a parameter, and runs it immediately based on the provided options.
- The provided options are temporary and are scoped only for this run.
- The provided options will be merged with the global and the default options.

```typescript
lbDate(options).run(() => {
  strResult = JSON.stringify(someObject);
});
```

or

```typescript
function parseResult(someObject) {
  return lbDate(options).run(() => JSON.stringify(someObject));
}
```

### Get Current Configurations

Get the current global configurations that were set by the last **init**.

```typescript
lbDate.getGlobalConfig();
```

Get the default LbDate configurations:

```typescript
lbDate.getDefaultConfig();
```

### Restore

Undo any changes made by `lbDate.init()` to your environment.

- Restores the native _toJSON_ method.
- Removes the global options.

```typescript
lbDate.restore();
```

## Browser / Platform Support

- All current browsers (major versions from the last 2 years) are supported.
- Node.JS support.
- Source files are included in 'node_modules\lbdate\src'.
- UMD bundles\* are included in 'node_modules\lbdate\bundles'.
- IE11\*\* support (ES5 syntax) but polyfills like core-js will be required.

_\* Both ES5 and ES2015 UMD bundles are included and both have minified and non-minified versions. In all bundles the global would be `lbDate`._

_\*\* Please try to convince your managers to drop IE support._

## Licence

- [MIT Licence](https://github.com/LbJS/LbDate/blob/master/LICENSE)
- Copyright (c) 2020 Leon Bernstein.
