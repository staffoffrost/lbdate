import { LoggerConfig } from './logger'

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
  filesToCopy: string[],
  npmGetVerCommand: string,
  buildPackageJsonConfig: PackageJsonConfig,
  rootPackageJsonConfig: PackageJsonConfig,
  packageLockJsonConfig: PackageJsonConfig,
}
