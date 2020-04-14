
declare global {
  interface Date {
    toOriginalJSON(this: Date): string
  }
}

export { }

