
export function validateOffset(mins: number): number {
  return mins > 840 ? 840 : mins < -840 ? -840 : mins
}
