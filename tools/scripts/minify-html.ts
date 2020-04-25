import { exec } from 'child_process'
import { Provider } from '../provider'

export default async function main(): Promise<void> {
  const command = Provider.getPostPgBuildConfigHandler().config.minifyHtmlCommand
  await minifyHtml(command)
}

function minifyHtml(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      error ? reject(error || stderr) : resolve(stdout)
    })
  })
}
