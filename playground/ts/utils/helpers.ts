import { lbDate } from 'lbdate'

export function isNullable(value: any): value is null | undefined {
  return value === null || value === undefined
}

export function runAsync(callback: () => void): void {
  setTimeout(() => {
    callback()
  })
}

export function getCurrentToJsonMethodName(): string {
  return lbDate().getGlobalConfig().toNativeJsonName ?? lbDate().getDefaultConfig().toNativeJsonName
}

export function isMethodInDatesPrototype(methodName: string): boolean {
  return !!Date.prototype[methodName]
}

export function capitalize(str: string): string {
  return str && str[0].toUpperCase() + str.slice(1)
}
