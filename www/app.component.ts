import { lbDate } from 'lbdate'
import { CommonService } from './common.service'
import { DateSelectionComponent } from './date-selections.component'
import { LbDateOptionsComponent } from './lbdate-options.component'
import { ObservablesService } from './observables.service'
import { SerializationResultComponent } from './serialization-result.component'

export class AppComponent {

  private static _app: AppComponent | null = null

  private constructor(
    private _observables: ObservablesService,
    private _common: CommonService,
    private _dateSelection: DateSelectionComponent,
    private _lbDateOptions: LbDateOptionsComponent,
  ) { }

  public static buildApp(): AppComponent {
    if (this._app) return this._app
    const observablesService = ObservablesService.getObservableService()
    const commonService = CommonService.getService()
    this._app = new AppComponent(
      observablesService,
      commonService,
      new DateSelectionComponent(
        observablesService,
        commonService,
        new SerializationResultComponent(observablesService, commonService),
      ),
      new LbDateOptionsComponent(observablesService, commonService),
    )
    return this._app
  }

  public init(): void {
    this._dateSelection.init()
    this._lbDateOptions.init()
    this._setObservers()
  }

  private _setObservers(): void {
    this._observables.onLbDateOptionsChange(options => {
      lbDate().restore();
      (options ? lbDate(options) : lbDate()).init()
      this._observables.lbDateUpdated()
    })
  }
}
