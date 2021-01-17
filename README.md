# LbDate

JavaScript Date's serialization helper. Provides an easy way for keeping timezone after stringification and more.

LbDate uses ISO 8601 standards.

## New Features

Replacer for `JSON.stringify`

```typescript
const replacer = lbDate.getReplacer();
const str = JSON.stringify(myObj, replacer);
```

"Moment" support:

```typescript
lbDate.init(moment);
```

## Installation

```bach
npm i lbdate
```

## CDN

| URL                                                                       | ES     | Minified |
| ------------------------------------------------------------------------- | ------ | -------- |
| <https://cdn.jsdelivr.net/npm/lbdate@1.4.0/bundles/lbdate.umd.js>         | ES2015 | No       |
| <https://cdn.jsdelivr.net/npm/lbdate@1.4.0/bundles/lbdate.umd.min.js>     | ES2015 | Yes      |
| <https://cdn.jsdelivr.net/npm/lbdate@1.4.0/bundles/lbdate.umd.es5.js>     | ES5    | No       |
| <https://cdn.jsdelivr.net/npm/lbdate@1.4.0/bundles/lbdate.umd.es5.min.js> | ES5    | Yes      |

## Example

```typescript
lbDate.init();
const result = JSON.stringify({ date: new Date() });
console.log(result);

// {"date":"2020-04-01T03:00:00.000+03:00"}
```

## Playground

### [Click here to check our Playground.](https://lbdate-dev.web.app/playground/)

## Documentation

### Initialization

The `init` method will override the prototype of the Date's object. This is the preferred way to you lbDate if you want 'write once and forget'.

```typescript
import lbDate from "lbdate";

lbDate.init();
```

Or with options:

> If options are provided, they will be set as the new global options and may later be used for other LbDate's functionalities like the `run` or `override` methods.

```typescript
import lbDate from "lbdate";

const options = {
  precision: 0,
  toNativeJsonName: "myNameForIt",
  timezone: TimeZoneOptions.manual,
  manualTimeZoneOffset: -120,
};

lbDate(options).init();
```

> Remember, the native method is store under different method name (that is configurable) and can be restored at any time by calling `lbDate.restore()`.

"Moment" support:

```typescript
import lbDate from "lbdate";
import moment from "moment";

lbDate.init(moment);
```

> This will force "moment" to use LbDate's serialization automatically, resulting the same behavior for all date types in your application. Also, when using `lbDate.restore()` it will revert any changes done to "moment".

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

This method allows you to use different serialization configurations for different sections of your app.

- This method takes a function as a parameter, and runs it immediately based on the provided options.
- The provided options are temporary and are scoped only for this run.
- The provided options will be merged with the global and the default options.

```typescript
const obj = {
  date: new Date(),
};

function stringifyObject(o) {
  return lbDate(options).run(() => JSON.stringify(o));
}

console.log(stringifyObject(obj));

// {"date":"2020-04-01T03:00:00.000+03:00"}
```

### Single date's `toJSON` method override

> If you don't want to override the date's prototype method by using `lbDate.init()` you can override a single date's `toJSON` method.

Using the `toJSON` property:

```typescript
const date = new Date();
date.toJSON = lbDate.toJSON;
console.log(date.toJSON());

// "2020-04-01T03:00:00.000+03:00"
```

Or with the `override` method:

```typescript
const date = lbDate.override(new Date());
console.log(date.toJSON());

// "2020-04-01T03:00:00.000+03:00"
```

Both possibilities can also be provided with options:

- The provided options will be merged with the global and the default options.
- The global options are the options provided by `lbDate(options).init()`. If those options weren't provided, then it will just use the default options for merging.

```typescript
const myDate = new Date();
myDate.toJSON = lbDate(options).toJSON;
// or
const date = lbDate(options).override(new Date());
```

### Get Replacer

This methods allows you to generate a `replacer` functions that can be user with `JSON.stringify`.

```typescript
lbDate.getReplacer();
//or
lbDate(options).getReplacer();
```

> If you already using a replacer function of your own, you can combine your replacer with LbDate's replacer simply by providing it as an argument like this: `lbDate.getReplacer(myReplacer)`. Your replacer will be called every time after LbDate's replacer is called.

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

- Restores the native `toJSON` method.
- Removes the global options.
- Reverts changes done to "moment" if any.

```typescript
lbDate.restore();
```

## Browser / Platform Support

- All current browsers (major versions from the last 2 years) are supported.
- Node.JS support.
- Source files are included in 'node_modules\lbdate\src'.
- UMD bundles\* are included in 'node_modules\lbdate\bundles'.
- IE11\*\* ES5 syntax support.

_\* Both ES5 and ES2015 UMD bundles are included and both have minified and non-minified versions. In all bundles the global would be `lbDate`._

_\*\* For IE11 you may need additional polyfills but if you're using a framework, they may already be included._

## Licence

- [MIT Licence](https://github.com/LbJS/LbDate/blob/master/LICENSE)
- Copyright (c) 2020 Leon Bernstein.
