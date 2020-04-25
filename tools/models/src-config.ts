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
  filesToCopy: FileCopyConfig,
  npmGetVerCommand: string,
  buildPackageJsonConfig: PackageJsonConfig,
  rootPackageJsonConfig: PackageJsonConfig,
  packageLockJsonConfig: PackageJsonConfig,
}
