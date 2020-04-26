import { SrcBuildConfig } from '../models'
import { LOGGER_CONFIG } from './logger-config'

const rootFolder = './'
const buildFolder = 'build'

const createCommand = (moduleName: string) => `tsc -p src/tsconfig.${moduleName}.json`
const createStartInfoLog = (moduleName: string) => `SRC ${moduleName} build started.`
const createEndInfoLog = (moduleName: string) => `SRC ${moduleName} build was finished.`

export const SRC_BUILD_CONFIG: SrcBuildConfig = {
  logger: LOGGER_CONFIG,
  rootFolder,
  buildFolder,
  buildSets: [
    {
      command: createCommand('es5'),
      startInfoLog: createStartInfoLog('es5'),
      endInfoLog: createEndInfoLog('es5'),
    },
    {
      command: createCommand('es2015'),
      startInfoLog: createStartInfoLog('es2015'),
      endInfoLog: createEndInfoLog('es2015'),
    },
    {
      command: createCommand('es2018'),
      startInfoLog: createStartInfoLog('es2018'),
      endInfoLog: createEndInfoLog('es2018'),
    },
    {
      command: createCommand('esm5'),
      startInfoLog: createStartInfoLog('esm5'),
      endInfoLog: createEndInfoLog('esm5'),
    },
    {
      command: createCommand('esm2015'),
      startInfoLog: createStartInfoLog('esm2015'),
      endInfoLog: createEndInfoLog('esm2015'),
    },
    {
      command: createCommand('esm2018'),
      startInfoLog: createStartInfoLog('esm2018'),
      endInfoLog: createEndInfoLog('esm2018'),
    },
  ],
}
