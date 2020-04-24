import { pathExistsSync, renameSync } from 'fs-extra'
import { dirname } from 'path'
import { fileNameWithPostfix } from 'path-extra'
import { getAllFilesFromDirectory, resolvePath, resolvePathsList } from '../extensions'
import { assertNotEmpty } from '../helpers/assert-not-empty'
import { PostPgBuildConfig } from '../models'
import { Provider } from '../provider'

export default async function main(): Promise<void> {
  let config = Provider.getPostPgBuildConfigHandler().appConfig.fileHasher
  if (!config) throw new Error('File string replacer was requested without configuration.')
  config = resolveConfigPaths(config)
  assertNotEmpty(config)
  validateConfigPaths(config)
  const hash = Provider.getHashHandler().hash
  const allFiles = getAllFilesFromDirectory(config.rootFolder)
  for (const file of allFiles) {
    if (config.excludedFiles.some(x => x === file)) continue
    if (config.includedFiles.some(x => x === file)) {
      renameSync(file, hashFileName(file, hash))
    } else if (config.excludedSubFolders.some(x => dirname(file).includes(x)
      && (config!.includedSubFolders.every(y => !dirname(file).includes(y))
        || config!.includedSubFolders.some(y => dirname(file).includes(y)
          && x.length >= y.length)))
    ) {
      continue
    } else if (config.fileExtensions.some(x => file.endsWith(x))) {
      renameSync(file, hashFileName(file, hash))
    }
  }
}

function resolveConfigPaths(config: PostPgBuildConfig['fileHasher']): PostPgBuildConfig['fileHasher'] {
  assertNotEmpty(config)
  config.rootFolder = resolvePath(config.rootFolder)
  config.excludedFiles = resolvePathsList(config.excludedFiles, config.rootFolder)
  config.includedFiles = resolvePathsList(config.includedFiles, config.rootFolder)
  config.excludedSubFolders = resolvePathsList(config.excludedSubFolders, config.rootFolder)
  config.includedSubFolders = resolvePathsList(config.includedSubFolders, config.rootFolder)
  return config
}

function validateConfigPaths(config: PostPgBuildConfig['fileHasher']): void {
  assertNotEmpty(config)
  const allPaths = [
    config.rootFolder,
    config.excludedFiles,
    config.includedFiles,
    config.excludedSubFolders,
    config.includedSubFolders,
  ].flat()
  allPaths.forEach(resolvedPath => {
    if (!pathExistsSync(resolvedPath)) throw new Error(`Path: ${resolvedPath} doesn't exist.`)
  })
}

function hashFileName(filePath: string, hash: string): string {
  return fileNameWithPostfix(filePath, `.${hash}`)
}
