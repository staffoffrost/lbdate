# LbDate - _beta version_

JavaScript Date object ISO 8601 serialization helper.

## Example:

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

## Installation:

    npm i lbdate
