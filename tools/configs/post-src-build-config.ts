import { PostSrcBuildConfig } from '../models/src-config'
import { LOGGER_CONFIG } from './logger-config'

const rootFolder = './'
const buildFolder = 'build'

export const POST_SRC_BUILD_CONFIG: PostSrcBuildConfig = {
  logger: LOGGER_CONFIG,
  rootFolder,
  buildFolder,
  packageJsonPath: 'package.json',
  packageLockJsonPath: 'package-lock.json',
  filesToCopy: {
    rootFolder,
    targetFolder: buildFolder,
    files: [
      'README.md',
      'LICENSE',
    ],
  },
  npmGetVerCommand: 'npm show [appName] version',
  buildPackageJsonConfig: {
    propertiesToDelete: [
      'scripts',
      'devDependencies',
      'jest',
      'types',
    ],
    propertiesToAddOrUpdate: [
      {
        key: 'main',
        value: './index.js'
      },
      {
        key: 'typings',
        value: './index.d.ts'
      },
    ]
  },
  rootPackageJsonConfig: {
    propertiesToDelete: [],
    propertiesToAddOrUpdate: [
      {
        key: 'version',
        value: '[appVer]'
      },
      {
        key: 'scripts.git:tag&push&push-tag',
        value: 'git tag [appVer] && git push && git push --tags'
      },
    ]
  },
  packageLockJsonConfig: {
    propertiesToDelete: [],
    propertiesToAddOrUpdate: [
      {
        key: 'version',
        value: '[appVer]'
      },
    ]
  }
}
