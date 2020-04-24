import { PostSrcBuildConfig } from '../models/src-config'
import { LOGGER_CONFIG } from './logger-config'

export const POST_SRC_BUILD_CONFIG: PostSrcBuildConfig = {
  logger: LOGGER_CONFIG,
  rootFolder: './',
  buildFolder: 'build',
  filesToCopy: [
    'README.md',
    'LICENSE',
  ],
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
