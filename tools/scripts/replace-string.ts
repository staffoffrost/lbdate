import { resolve as resolvePath } from 'path'
import { readStrFromFile, writeStrToFile } from '../extensions'
import { PostPgBuildConfig, StringReplacementSet } from '../models'
import { Provider } from '../provider'

export default async function main(): Promise<void> {
  const config = Provider.getConfigHandler<PostPgBuildConfig>().appConfig.fileStringReplacer
  if (!config) throw new Error('File string replacer was requested without configuration.')
  const hash = Provider.getHashHandler().hash
  config.sets.forEach(dataSet => {
    const filePath = resolvePath(config.rootFolder, dataSet.filePath)
    let fileStr = readStrFromFile(filePath)
    if (!fileStr) throw new Error(`This file is empty: ${filePath}`)
    fileStr = replaceStrings(
      dataSet.replacementSets,
      hash,
      fileStr,
      filePath,
    )
    writeStrToFile(filePath, fileStr)
  })
}

function replaceStrings(
  replacementSets: StringReplacementSet[],
  hash: string,
  fileStr: string,
  filePath: string,
): string {
  replacementSets.forEach(set => {
    if (!fileStr.includes(set.currStr)) {
      throw new Error(`Cannot replace ${set.currStr} because it wasn't found in this file: ${filePath}.`)
    }
    if (set.nextStr.includes('[hash]')) {
      set.nextStr = set.nextStr.replace('[hash]', hash)
    }
    fileStr = fileStr.replace(set.currStr, set.nextStr)
  })
  return fileStr
}
