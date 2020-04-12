
export function isNullable(value: any): value is null | undefined {
  return value === null || value === undefined
}

export function runAsync(callback: () => void): void {
  setTimeout(() => {
    callback()
  })
}
