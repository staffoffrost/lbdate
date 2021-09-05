
// tslint:disable-next-line: ban-types
export function setMethodToDatesProto(methodName: string, method: ((value?: any) => any) | Function): void {
  Date.prototype[methodName] = method
}
