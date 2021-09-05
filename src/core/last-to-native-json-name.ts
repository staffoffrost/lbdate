
let lastToNativeJsonName: string | null = null

export function getLastToNativeJsonName(): string | null {
  return lastToNativeJsonName
}

export function setLastToNativeJsonName(value: string | null): void {
  lastToNativeJsonName = value
}
