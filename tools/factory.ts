import { FilesCopyHandler } from './handlers/files-copy.handler'

export class Factory {

  public static createFilesCopyHandler = () => new FilesCopyHandler()
}
