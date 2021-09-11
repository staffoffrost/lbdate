import { MomentLike } from '../../interfaces'

export function createMomentToDateMethod(toISOString: (this: Date) => string): (this: MomentLike) => Date {
  return function (this: MomentLike): Date {
    const date = new Date(this.valueOf())
    date.toISOString = toISOString
    return date
  }
}
