import { SrcBuildConfig } from '../models'
import { LOGGER_CONFIG } from './logger-config'

const rootFolder = './'
const buildFolder = 'build'
const sourceFolderName = 'src'

export const SRC_BUILD_CONFIG: SrcBuildConfig = {
  logger: LOGGER_CONFIG,
  rootFolder,
  buildFolder,
  filesToCopy: {
    rootFolder,
    targetFolder: `${buildFolder}/${sourceFolderName}`,
    sourceFolder: {
      name: sourceFolderName,
      excludedFiles: [
        'tsconfig.json'
      ],
    }
  }
}
