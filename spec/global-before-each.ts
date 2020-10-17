
globalThis.beforeEach(() => {
  globalThis.nativeToJsonBackup = Date.prototype.toJSON
  globalThis.datePrototypePropertyNames = Object.getOwnPropertyNames(Date.prototype)
})
