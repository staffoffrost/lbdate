import { LbDateOptions } from 'lbdate'

const DATE_TIME_KEY = 'lbdate-dateTime'
const LBDATE_OPTIONS_KEY = 'lbdate-options'

export class ObservableService {

  private static _observableService: ObservableService | null = null

  private _dateTimeCallbacks: ((daTime: Date | null) => void)[] = []
  private _dateTime: Date | null = null
  public get dateTime(): Date | null {
    if (this._dateTime) return this._dateTime
    const dateTimeStr = localStorage.getItem(DATE_TIME_KEY)
    if (dateTimeStr) this._dateTime = new Date(dateTimeStr)
    return this._dateTime
  }
  public set dateTime(value: Date | null) {
    this._dateTime = value
    value ? localStorage.setItem(DATE_TIME_KEY, value.toISOString()) : localStorage.removeItem(DATE_TIME_KEY)
    this._runCallBacks(this._dateTimeCallbacks, this.dateTime)
  }

  private _lbDateOptionsCallbacks: ((options: Partial<LbDateOptions> | null) => void)[] = []
  private _lbDateOptions: Partial<LbDateOptions> | null = null
  public get lbDateOptions(): Partial<LbDateOptions> | null {
    if (this._lbDateOptions) return this._lbDateOptions
    const lbDateOptionsStr = localStorage.getItem(LBDATE_OPTIONS_KEY)
    if (lbDateOptionsStr) this._lbDateOptions = JSON.parse(lbDateOptionsStr) as Partial<LbDateOptions>
    return this._lbDateOptions
  }
  public set lbDateOptions(value: Partial<LbDateOptions> | null) {
    this._lbDateOptions = value
    value ? localStorage.setItem(LBDATE_OPTIONS_KEY, JSON.stringify(value)) : localStorage.removeItem(LBDATE_OPTIONS_KEY)
    this._runCallBacks(this._lbDateOptionsCallbacks, this.lbDateOptions)
  }

  private constructor() { }

  public static getObservableService(): ObservableService {
    if (!ObservableService._observableService) ObservableService._observableService = new ObservableService()
    return ObservableService._observableService
  }

  private _runCallBacks(callBacks: ((arg: any) => void)[], arg: any): void {
    callBacks.forEach(f => {
      this._runCallBackAsync(f, arg)
    })
  }

  private _runCallBackAsync(callBack: ((args: any) => void), arg: any): void {
    setTimeout(() => {
      callBack(arg)
    })
  }

  public onDateTimeChange(callBack: (daTime: Date | null) => void): void {
    this._dateTimeCallbacks.push(callBack)
    this._runCallBackAsync(callBack, this.dateTime)
  }

  public onLbDateOptionsChange(callBack: (options: Partial<LbDateOptions> | null) => void): void {
    this._lbDateOptionsCallbacks.push(callBack)
    this._runCallBackAsync(callBack, this.lbDateOptions)
  }
}
