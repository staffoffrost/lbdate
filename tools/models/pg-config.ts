import { BannerAdder } from './banner-adder'
import { LoggerConfig } from './logger-config'

export interface StringReplacementSet {
  currStr: string,
  nextStr: string,
}

export interface StringReplacementData {
  filePath: string,
  replacementSets: StringReplacementSet[]
}

export interface FileStringReplacer {
  rootFolder: string,
  sets: StringReplacementData[]
}

export interface PostPgBuildConfig {
  logger: LoggerConfig,
  hashLength: number,
  hashCharPool: string,
  minifyHtmlCommand: string,
  fileStringReplacer: FileStringReplacer,
  fileHasher: {
    rootFolder: string,
    fileExtensions: string[],
    excludedFiles: string[],
    includedFiles: string[],
    excludedSubFolders: string[],
    includedSubFolders: string[],
  },
  hashVerifier: {
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
  bannerAdder: BannerAdder
}
