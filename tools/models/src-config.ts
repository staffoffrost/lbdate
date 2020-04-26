import { FileCopyConfig } from './files-copy-config'
import { LoggerConfig } from './logger-config'

export interface PackageJsonConfig {
  propertiesToDelete: string[],
  propertiesToAddOrUpdate: {
    key: string,
    value: string,
  }[]
}

export interface PostSrcBuildConfig {
  logger: LoggerConfig,
  rootFolder: string,
  buildFolder: string,
  packageJsonPath: string,
  packageLockJsonPath: string,
  filesToCopy: FileCopyConfig | FileCopyConfig[],
  npmGetVerCommand: string,
  buildPackageJsonConfig: PackageJsonConfig,
  rootPackageJsonConfig: PackageJsonConfig,
  packageLockJsonConfig: PackageJsonConfig,
}

export interface SrcBuildConfig {
  logger: LoggerConfig,
  rootFolder: string,
  buildFolder: string,
  buildSets: {
    command: string,
    startInfoLog: string,
    endInfoLog: string,
  }[]
}
