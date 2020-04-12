import { lbDate } from 'lbdate'
import { ObservablesService } from './observables.service'

export class CommonService {

  private static _common: CommonService | null = null

  private constructor(
    private _observables: ObservablesService
  ) { }

  public static getService(): CommonService {
    if (!CommonService._common) {
      CommonService._common = new CommonService(
        ObservablesService.getObservableService()
      )
    }
    return CommonService._common
  }

  public getCurrentToJsonMethodName(): string {
    return lbDate().getGlobalConfig().originalToJsonName ?? lbDate().getDefaultConfig().originalToJsonName
  }

  public isMethodInDatesPrototype(methodName: string): boolean {
    return !!Date.prototype[methodName]
  }
}
