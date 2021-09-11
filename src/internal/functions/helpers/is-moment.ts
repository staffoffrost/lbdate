import { InternalMomentLike } from '../../interfaces'
import { isDate } from './is-date'
import { isFunction } from './is-function'
import { isObject } from './is-object'

export function isMoment(value: any): value is InternalMomentLike {
  return isObject<Record<any, any>>(value) && value._isAMomentObject && isDate(value._d) && isFunction(value.valueOf)
}
