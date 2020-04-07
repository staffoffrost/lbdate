
// tslint:disable-next-line: ban-types
export function cloneFunction(func: Function): Function {
	// tslint:disable-next-line: typedef
	const tempFunc = function temporary(this: any) {
		return func.apply(this, arguments)
	}
	for (const key in func) {
		if (func.hasOwnProperty(key)) {
			(tempFunc as any)[key] = (func as any)[key]
		}
	}
	return tempFunc
}
