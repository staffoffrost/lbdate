import { LbDateOptions } from 'lbdate'
import { runAsync } from './utils'

const DATE_TIME_KEY = 'lbdate-dateTime'
const LBDATE_OPTIONS_KEY = 'lbdate-options'
const LBDATE_IS_SHOW_SCOPED_RUN = 'lbdate-isShowScopedRun'

export class ObservablesService {

  private static _observableService: ObservablesService | null = null

  private _dateTime: Date | null = null
  private _dateTimeCallbacks: ((daTime: Date | null) => void)[] = []

  private _lbDateOptions: Partial<LbDateOptions> | null = null
  private _lbDateOptionsCallbacks: ((options: Partial<LbDateOptions> | null) => void)[] = []

  private _lbDateChangeCallbacks: (() => void)[] = []

  private _isShowScopedRun: boolean | null = null
  private _isShowScopedRunCallbacks: ((show: boolean) => void)[] = []

  private _scopedRunResult: string | null = null
  private _scopedRunResultCallbacks: ((value: string | null) => void)[] = []

  private _newScopedRunRequestCallbacks: (() => void)[] = []

  private constructor() { }

  public static getObservableService(): ObservablesService {
    if (!ObservablesService._observableService) ObservablesService._observableService = new ObservablesService()
    return ObservablesService._observableService
  }

  private _runCallBacks(callBacks: ((arg: any) => void)[], arg?: any): void {
    callBacks.forEach(cb => {
      runAsync(() => {
        cb(arg)
      })
    })
  }

  public onDateTimeChange(callback: (daTime: Date | null) => void, runNow: boolean = true): void {
    this._dateTimeCallbacks.push(callback)
    if (!runNow) return
    runAsync(() => {
      callback(this._dateTime)
    })
  }
  public nextDateTime(value: Date | null): void {
    this._dateTime = value
    value ? localStorage.setItem(DATE_TIME_KEY, value.toISOString()) : localStorage.removeItem(DATE_TIME_KEY)
    this._runCallBacks(this._dateTimeCallbacks, value)
  }
  public getDateTime(): Date | null {
    if (this._dateTime) return this._dateTime
    const dateTimeStr = localStorage.getItem(DATE_TIME_KEY)
    if (dateTimeStr) this._dateTime = new Date(dateTimeStr)
    return this._dateTime
  }

  public onLbDateOptionsChange(callback: (options: Partial<LbDateOptions> | null) => void, runNow: boolean = true): void {
    this._lbDateOptionsCallbacks.push(callback)
    if (!runNow) return
    runAsync(() => {
      callback(this._lbDateOptions)
    })
  }
  public nextLbDateOptions(value: Partial<LbDateOptions> | null): void {
    this._lbDateOptions = value
    value ? localStorage.setItem(LBDATE_OPTIONS_KEY, JSON.stringify(value)) : localStorage.removeItem(LBDATE_OPTIONS_KEY)
    this._runCallBacks(this._lbDateOptionsCallbacks, value)
  }
  public getLbDateOptions(): Partial<LbDateOptions> | null {
    if (this._lbDateOptions) return this._lbDateOptions
    const lbDateOptionsStr = localStorage.getItem(LBDATE_OPTIONS_KEY)
    if (lbDateOptionsStr) this._lbDateOptions = JSON.parse(lbDateOptionsStr) as Partial<LbDateOptions>
    return this._lbDateOptions
  }

  public onLbDateChange(callback: () => void, runNow: boolean = true): void {
    this._lbDateChangeCallbacks.push(callback)
    if (!runNow) return
    runAsync(() => {
      callback()
    })
  }
  public nextLbDateChange(): void {
    this._runCallBacks(this._lbDateChangeCallbacks)
  }

  public onIsShowScopedRunChange(callback: (show: boolean) => void, runNow: boolean = true): void {
    this._isShowScopedRunCallbacks.push(callback)
    if (!runNow) return
    runAsync(() => {
      callback(this.getIsShowScopedRun())
    })
  }
  public nextIsShowScopedRun(value: boolean): void {
    localStorage.setItem(LBDATE_IS_SHOW_SCOPED_RUN, JSON.stringify(value))
    this._isShowScopedRun = value
    this._runCallBacks(this._isShowScopedRunCallbacks, value)
  }
  public getIsShowScopedRun(): boolean {
    if (this._isShowScopedRun === null) {
      const storedVal = localStorage.getItem(LBDATE_IS_SHOW_SCOPED_RUN)
      this._isShowScopedRun = storedVal ? !!JSON.parse(storedVal) : false
    }
    return this._isShowScopedRun
  }

  public onScopedRunResultChange(callback: (value: string | null) => void, runNow: boolean = true): void {
    this._scopedRunResultCallbacks.push(callback)
    if (!runNow) return
    runAsync(() => {
      callback(this._scopedRunResult)
    })
  }
  public nextScopedRunResult(value: string | null): void {
    this._scopedRunResult = value
    this._runCallBacks(this._scopedRunResultCallbacks, value)
  }
  public getScopedRunResult(): string | null {
    return this._scopedRunResult
  }

  public onNewScopedRunRequest(callback: () => void, runNow: boolean = true): void {
    this._newScopedRunRequestCallbacks.push(callback)
    if (!runNow) return
    runAsync(() => {
      callback()
    })
  }
  public nextNewScopedRunRequest(): void {
    this._runCallBacks(this._newScopedRunRequestCallbacks)
  }
}
