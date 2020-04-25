import { copyFilesList, getAllFilesFromDirectory, resolvePath, resolvePathsList } from '../extensions'
import { FileCopyConfig } from '../models/files-copy-config'

export class FilesCopyHandler {

  constructor() { }

  public copyFiles(config: FileCopyConfig): void {
    if (!config.files && !config.sourceFolder) {
      throw new Error("Can't initiate Files Copy Handler without files list or source folder.")
    }
    const listOfFilesToCopy = this._createListOfFiles(config)
    const targetFolder = resolvePath(config.rootFolder, config.targetFolder)
    copyFilesList(listOfFilesToCopy, targetFolder)
  }

  private _createListOfFiles(config: FileCopyConfig): string[] {
    let files: string[] = []
    if (config.files) {
      files = files.concat(resolvePathsList(config.files, config.rootFolder))
    }
    if (config.sourceFolder) {
      const sourcePath = resolvePath(config.rootFolder, config.sourceFolder.name)
      const filteredFiles = getAllFilesFromDirectory(sourcePath).filter(file => {
        if (config.sourceFolder!.excludedFiles.some(x => file == resolvePath(config.rootFolder, config.sourceFolder!.name, x))) {
          return false
        }
        if (config.sourceFolder!.includedFiles.some(x => file == resolvePath(config.rootFolder, config.sourceFolder!.name, x))) {
          return true
        }
        if (config.sourceFolder!.excludedSubFolder.some(x =>
          file.startsWith(resolvePath(config.rootFolder, config.sourceFolder!.name, x))
          && !config.sourceFolder!.excludedSubFolder.every(y =>
            file.startsWith(resolvePath(config.rootFolder, config.sourceFolder!.name, y))
            && x.length > y.length))
        ) {
          return false
        }
        return true
      })
      files = [...files, ...filteredFiles]
    }
    return files
  }
}
