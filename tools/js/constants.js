
const BABEL_DEFAULT_CONFIG = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: [
          './'
        ],
        alias: {}
      }
    ]
  ]
}
const SETTINGS_FOLDER = 'tools/configurations'
const POST_DIST_BUILD_STRING_REPLACER_CONFIG_PATH = 'post-dist-build-string-replacer.json'
const POST_DIST_BUILD_FILE_HASHER_CONFIG_PATH = 'post-dist-build-file-hasher.json'
const HASH_BLOCK = '[hash]'
const ENCODING = 'utf8'
const HASH_LENGTH = 20
const HASH_CHAR_POOL = 'abcdefghijklmnopqrstvuwxyzABCDEFGHIJKLMNOPQRSTVUWXYZ0123456789'
const PACKAGE_JSON_FILE_NAME = 'package.json'

module.exports = {
  BABEL_DEFAULT_CONFIG,
  SETTINGS_FOLDER,
  POST_DIST_BUILD_STRING_REPLACER_CONFIG_PATH,
  POST_DIST_BUILD_FILE_HASHER_CONFIG_PATH,
  HASH_BLOCK,
  ENCODING,
  HASH_LENGTH,
  HASH_CHAR_POOL,
  PACKAGE_JSON_FILE_NAME,
}
