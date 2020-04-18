
declare global {
  interface Date {
    toNativeJSON(this: Date): string
  }
}

export { }

