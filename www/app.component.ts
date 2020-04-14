import { lbDate, TimeZoneOptions } from 'lbdate'
import { DateSelectionComponent } from './date-selections.component'
import { getElementById, setValueToElement } from './dom'
import { LbDateOptionsComponent } from './lbdate-options.component'
import { ObservablesService } from './observables.service'
import { SerializationResultComponent } from './serialization-result.component'

export class AppComponent {

  private constructor(
    private _observables: ObservablesService,
    private _dateSelection: DateSelectionComponent,
    private _lbDateOptions: LbDateOptionsComponent,
  ) { }

  private static _app: AppComponent | null = null

  private _elements = {
    lbDateVersion: getElementById('lbDateVersion') as HTMLSpanElement,
  }

  public static buildApp(): AppComponent {
    if (this._app) return this._app
    const observablesService = ObservablesService.getObservableService()
    this._app = new AppComponent(
      observablesService,
      new DateSelectionComponent(
        observablesService,
        new SerializationResultComponent(observablesService),
      ),
      new LbDateOptionsComponent(observablesService),
    )
    return this._app
  }

  public init(): void {
    this._dateSelection.init()
    this._lbDateOptions.init()
    this._setObservers()
    this._scopedRun()
    this._setVersion()
  }

  private _setObservers(): void {
    this._observables.onLbDateOptionsChange(options => {
      lbDate().restore();
      (options ? lbDate(options) : lbDate()).init()
      this._observables.nextLbDateChange()
    })
    this._observables.onIsShowScopedRunChange(this._scopedRun.bind(this), false)
    this._observables.onNewScopedRunRequest(this._scopedRun.bind(this), false)
  }

  private _scopedRun(): void {
    lbDate({
      timezone: TimeZoneOptions.manual,
      manualTimeZoneOffset: -840,
    }).run(() => {
      const result = JSON.stringify({ date: new Date() })
      this._observables.nextScopedRunResult(result)
    })
  }

  private async _setVersion(): Promise<void> {
    try {
      const version: string = (await fetch('version.json').then(r => r.json())).version
      if (!version) throw new Error()
      setValueToElement(this._elements.lbDateVersion, version)
    } catch {
      this._elements.lbDateVersion.parentElement?.remove()
    }
  }
}
