
export function momentToDate(toISOString: (this: Date) => string): (this: any) => Date {
  return function (this: any): Date {
    const date = new Date(this.valueOf())
    date.toISOString = toISOString
    return date
  }
}
