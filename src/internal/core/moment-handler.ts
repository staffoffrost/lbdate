import { createMomentToDateMethod } from '../functions'
import { MomentObj } from '../interfaces'

let momentRef: MomentObj | null = null
let momentToDateMethodCache: ((this: any) => Date) | null = null

const momentRefTemp = new Map<string, MomentObj>()
const momentToDateMethodCacheTemp = new Map<string, (this: any) => Date>()

export function setMoment(
  moment: MomentObj,
  dateToISOString: (this: Date) => string,
  guid?: string
): void {
  if (guid) {
    momentRefTemp.set(guid, moment)
    momentToDateMethodCacheTemp.set(guid, moment.prototype.toDate)
    moment.prototype.toDate = createMomentToDateMethod(dateToISOString)
    return
  }
  momentRef = moment
  momentToDateMethodCache = momentRef.prototype.toDate
  momentRef.prototype.toDate = createMomentToDateMethod(dateToISOString)
}

export function restoreMomentsToDateMethod(guid?: string): void {
  if (guid) {
    let moment: MomentObj | null = null
    let toDate: ((this: any) => Date) | null = null
    if (momentRefTemp.has(guid)) {
      moment = momentRefTemp.get(guid)!
      momentRefTemp.delete(guid)
    }
    if (momentToDateMethodCacheTemp.has(guid)) {
      toDate = momentToDateMethodCacheTemp.get(guid)!
      momentToDateMethodCacheTemp.delete(guid)
      if (moment) moment.prototype.toDate = toDate
    }
    return
  }
  if (!momentRef || !momentToDateMethodCache) return
  momentRef.prototype.toDate = momentToDateMethodCache
}
