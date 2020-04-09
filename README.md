# LbDate - _beta version_

JavaScript Date object ISO 8601 serialization helper. Provides an easy way of automatically adding time zone while javascript serializes your objects.

## Example

Native serialization (UTC): 2020-04-08T02:47:13.261Z

    const myObj = {
        date: new Date()
    }

    const myStringObj = JSON.stringify(myObj)

    console.log(myStringObj)

    // {"date":"2020-04-08T02:47:13.261Z"}

LbDate serialization (+TimeZoneOffset): 2020-04-08T05:47:13.261+03:00

    lbDate().init()

    const myObj = {
        date: new Date()
    }

    const myStringObj = JSON.stringify(myObj)

    console.log(myStringObj)

    // {"date":"2020-04-08T05:47:13.261+03:00"}

## Installation

    npm i lbdate

## How It Works

LbDate will clone the native toJSON method to newly defined originalToJSON method on the Date object's prototype. Then it will override the native toJSON method based on the given options.

## Documentation

### Configuration

## Browser Support

- Support guaranteed for all current major browsers that were updated in the last 2 years.
- Support for ES5 may be added later as a different package or alternate imports paths may be provided.

> _Details_ The code is compiled to ES9 (EcmaScript 2018) to reduce the chance of unnecessary performance hit while still providing support for all versions of all major browsers from the last 2 years. If you need older browser support, you may need to recompile the code with TypeScript or Babel compiler to an older version. Currently ES6 (EcmaScript 2015) will work just fine, but recompiling to ES5 will not work if you need to support IE.
