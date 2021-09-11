import { overrideDatesToJson } from './override-dates-to-json'

export function restoreDatesToJson(lastToNativeJsonName: string | null, lastToNativeJsonNameSetter: (value: null) => void): void {
  if (lastToNativeJsonName) {
    overrideDatesToJson(Date.prototype[lastToNativeJsonName])
    delete Date.prototype[lastToNativeJsonName]
    lastToNativeJsonNameSetter(null)
  }
}
