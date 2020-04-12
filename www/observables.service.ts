import { LbDateOptions } from 'lbdate'
import { runAsync } from './utils'

const DATE_TIME_KEY = 'lbdate-dateTime'
const LBDATE_OPTIONS_KEY = 'lbdate-options'

export class ObservablesService {

  private static _observableService: ObservablesService | null = null

  private _dateTime: Date | null = null
  private _dateTimeCallbacks: ((daTime: Date | null) => void)[] = []
  private _lbDateOptions: Partial<LbDateOptions> | null = null
  private _lbDateOptionsCallbacks: ((options: Partial<LbDateOptions> | null) => void)[] = []
  private _lbDateUpdateCallbacks: (() => void)[] = []

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
  public setDateTime(value: Date | null): void {
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
  public setLbDateOptions(value: Partial<LbDateOptions> | null): void {
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

  public onLbDateUpdate(callback: () => void, runNow: boolean = true): void {
    this._lbDateUpdateCallbacks.push(callback)
    if (!runNow) return
    runAsync(() => {
      callback()
    })
  }
  public lbDateUpdated(): void {
    this._runCallBacks(this._lbDateUpdateCallbacks)
  }
}
