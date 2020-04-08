
// tslint:disable-next-line: ban-types
export function cloneFunction(func: Function): Function {
  const clonedFunction = function (this: any): any {
    return func.apply(this, arguments)
  }
  for (const key in func) {
    if (func.hasOwnProperty(key)) clonedFunction[key] = func[key]
  }
  return clonedFunction
}
