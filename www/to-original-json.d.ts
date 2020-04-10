
declare global {
  interface Date {
    toOriginalJSON(this: Date): string
  }
  const Vue: any
}

export { }

