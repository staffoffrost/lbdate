
globalThis.afterEach(() => {
  jest.resetModules()
  jest.restoreAllMocks()
  Date.prototype.toJSON = globalThis.nativeToJsonBackup
  const currentDatePrototypePropertyNames = Object.getOwnPropertyNames(Date.prototype)
  const datePrototypePropertyNames: string[] = globalThis.datePrototypePropertyNames
  currentDatePrototypePropertyNames.forEach(x => {
    if (!datePrototypePropertyNames.includes(x)) {
      delete Date.prototype[x]
    }
  })
})
