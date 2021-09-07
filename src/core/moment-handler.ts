import { createMomentToDateMethod } from '../functions'
import { MomentObj } from '../interfaces'

let momentRef: MomentObj | null = null
let momentToDateMethodCache: ((this: any) => Date) | null = null

export function setMoment(moment: MomentObj, toDateMethod: (this: Date) => string): void {
  momentRef = moment
  momentToDateMethodCache = momentRef.prototype.toDate
  momentRef.prototype.toDate = createMomentToDateMethod(toDateMethod)
}

export function restoreMomentsToDateMethod(): void {
  if (!momentRef || !momentToDateMethodCache) return
  momentRef.prototype.toDate = momentToDateMethodCache
}
