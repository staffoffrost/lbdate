
export function overrideDatesToJson(method: (key?: any) => string): void {
  Date.prototype.toJSON = method
}
