import { copySync } from 'fs-extra'
import { copyFilesList, getAllFilesFromDirectory, isDirectory, isFile, resolvePath, resolvePathsList } from '../extensions'
import { FileCopyConfig } from '../models/files-copy-config'

export function copyFiles(config: FileCopyConfig): void {
  if (!config.files && !config.sourceFolder) {
    throw new Error("Can't initiate Files Copy Handler without files list or source folder.")
  }
  const targetFolder = resolvePath(config.rootFolder, config.targetFolder)
  if (config.files) {
    const files = resolvePathsList(config.files, config.rootFolder)
    copyFilesList(files, targetFolder)
  }
  if (!config.sourceFolder) return
  const sourceFolderConfig = config.sourceFolder
  const rootFolder = config.rootFolder
  const sourceFolderFilter = (src: string): boolean => {
    const path = resolvePath(config.rootFolder, src)
    if (isFile(path)) {
      if (sourceFolderConfig.excludedFiles
        && sourceFolderConfig.excludedFiles.some(x => path == resolvePath(rootFolder, sourceFolderConfig.name, x))) {
        return false
      }
      if (sourceFolderConfig.includedFiles
        && sourceFolderConfig.includedFiles.some(x => path == resolvePath(rootFolder, sourceFolderConfig.name, x))) {
        return true
      }
    }
    if (sourceFolderConfig.excludedSubFolder
      && isDirectory(path)
      && sourceFolderConfig.excludedSubFolder.some(x =>
        path.startsWith(resolvePath(rootFolder, sourceFolderConfig.name, x))
        && (!sourceFolderConfig.includedSubFolder
          || !sourceFolderConfig.includedSubFolder.every(y =>
            path.startsWith(resolvePath(rootFolder, sourceFolderConfig.name, y))
            && x.length > y.length)))
    ) {
      return false
    }
    return true
  }
  copySync(sourceFolderConfig.name, targetFolder, { filter: sourceFolderFilter })

}


function createListOfFiles(sourceFolderConfig: FileCopyConfig['sourceFolder'], rootFolder: string): string[] {
  if (!sourceFolderConfig) return []
  const sourcePath = resolvePath(rootFolder, sourceFolderConfig.name)
  return getAllFilesFromDirectory(sourcePath).filter(file => {
    if (sourceFolderConfig.excludedFiles
      && sourceFolderConfig.excludedFiles.some(x => file == resolvePath(rootFolder, sourceFolderConfig.name, x))) {
      return false
    }
    if (sourceFolderConfig.includedFiles
      && sourceFolderConfig.includedFiles.some(x => file == resolvePath(rootFolder, sourceFolderConfig.name, x))) {
      return true
    }
    if (sourceFolderConfig.excludedSubFolder
      && sourceFolderConfig.excludedSubFolder.some(x =>
        file.startsWith(resolvePath(rootFolder, sourceFolderConfig.name, x))
        && (!sourceFolderConfig.includedSubFolder
          || !sourceFolderConfig.includedSubFolder.every(y =>
            file.startsWith(resolvePath(rootFolder, sourceFolderConfig.name, y))
            && x.length > y.length)))
    ) {
      return false
    }
    return true
  })
}
