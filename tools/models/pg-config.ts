import { LogLevels } from '../enums'

export interface StringReplacementSet {
  currStr: string,
  nextStr: string,
}

export interface StringReplacementData {
  filePath: string,
  replacementSets: StringReplacementSet[]
}

export interface PostPgBuildConfig {
  logger: {
    isActive: boolean,
    consoleLogLevel: LogLevels,
    fileLogLevel: LogLevels,
    logFolderLocation: string,
  },
  hashLength?: number,
  hashCharPool?: string,
  minifyHtmlCommand?: string,
  fileStringReplacer?: {
    rootFolder: string,
    sets: StringReplacementData[]
  },
  fileHasher?: {
    rootFolder: string,
    fileExtensions: string[],
    excludedFiles: string[],
    includedFiles: string[],
    excludedSubFolders: string[],
    includedSubFolders: string[],
  },
  hashVerifier?: {
    rootFolder: string,
    indexHtml?: string,
    excludedFiles: string[],
    excludedSubFolders: string[],
    hashSets: {
      hashedFile: string,
      initiatorFile: string,
    }[],
    nonHashedFilesValidation: {
      throwError: boolean,
      extensionToCheck: string[],
    }
  },
  bannerAdder?: {
    rootFolder: string,
    isSeparateRow: boolean,
    bannerSets: {
      fileType: string,
      banner: string
    }[],
    excludedFiles: string[],
    excludedSubFolders: string[],
    includedSubFolders: string[],
  }
}
