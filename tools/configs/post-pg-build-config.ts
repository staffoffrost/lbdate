import { PostPgBuildConfig } from '../models'
import { LOGGER_CONFIG } from './logger-config'

const rootFolder = 'dist'
const excludedDubFoldersForHashing = [
  'icons'
]

export const POST_PG_BUILD_CONFIG: PostPgBuildConfig = {
  logger: LOGGER_CONFIG,
  hashLength: 20,
  hashCharPool: 'abcdefghijklmnopqrstvuwxyzABCDEFGHIJKLMNOPQRSTVUWXYZ0123456789',
  fileStringReplacer: {
    rootFolder,
    sets: [
      {
        filePath: 'index.html',
        replacementSets: [
          {
            currStr: '<base href="/playground/www/">',
            nextStr: '<base href="/playgrounds/lbdate/">'
          },
          {
            currStr: 'src="./main.js"',
            nextStr: 'src="./main.[hash].js"'
          },
          {
            currStr: 'src="./loading-script.js"',
            nextStr: 'src="./loading-script.[hash].js"'
          },
        ]
      }
    ]
  },
  fileHasher: {
    rootFolder,
    fileExtensions: [
      '.js',
      '.css',
    ],
    excludedFiles: [],
    includedFiles: [],
    excludedSubFolders: excludedDubFoldersForHashing,
    includedSubFolders: [],
  },
  hashVerifier: {
    rootFolder,
    indexHtml: 'index.html',
    excludedFiles: [],
    excludedSubFolders: excludedDubFoldersForHashing,
    hashSets: [],
    nonHashedFilesValidation: {
      throwError: true,
      extensionToCheck: [
        '.js',
        '.css',
      ]
    }
  },
  bannerAdder: {
    rootFolder,
    isSeparateRow: true,
    bannerSets: [
      {
        fileType: '.js',
        banner: '/*! == Copyright 2020 Leon Bernstein | StaffOfFrost == */'
      },
      {
        fileType: '.css',
        banner: '/*! == Copyright 2020 Leon Bernstein | StaffOfFrost == */'
      },
      {
        fileType: '.html',
        banner: '<!-- Copyright 2020 Leon Bernstein | StaffOfFrost -->'
      },
    ],
    excludedFiles: [],
    excludedSubFolders: [],
    includedSubFolders: [],
  }
}
