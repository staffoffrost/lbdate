import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { isString } from '../helpers'

export function isDirEmpty(fullPath: string): boolean {
  return !readdirSync(fullPath).length
}

export function assertPathExist(fullPath: string): asserts fullPath {
  if (!existsSync(fullPath)) throw new Error(`Folder / file: "${fullPath}" do not exist."`)
}

export function readStrFromFile(filePath: string): string {
  const str = readFileSync(filePath, 'utf8')
  if (!isString(str)) throw new Error(`Can't read file: "${filePath}" as a string.`)
  return str
}

export function writeStrToFile(filePath: string, str: string): void {
  writeFileSync(filePath, str, 'utf8')
}
