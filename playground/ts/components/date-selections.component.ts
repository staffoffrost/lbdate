import { lbDate, TimeZoneOptions } from 'lbdate'
import { ObservablesService } from '../services/observables.service'
import { getElementById, getValueFromElement, setEventListener, setValueToElement } from '../utils/dom'
import { SerializationResultComponent } from './serialization-result.component'

export class DateSelectionComponent {

  private _elements = {
    form: getElementById('dateTimeSelectionForm') as HTMLFormElement,
    dateInput: getElementById('dateInput') as HTMLInputElement,
    timeInput: getElementById('timeInput') as HTMLInputElement,
    clearDateTimeBtn: getElementById('clearDateTimeBtn') as HTMLButtonElement,
    setCurrentDateBtn: getElementById('setCurrentDateBtn') as HTMLButtonElement,
  }

  constructor(
    private _observables: ObservablesService,
    private _serializationResult: SerializationResultComponent,
  ) { }

  public init(): void {
    this._serializationResult.init()
    if (!this._observables.getDateTime()) this._observables.nextDateTime(new Date())
    this._setDateTimeToFields(this._observables.getDateTime())
    this._bindDomeEvents()
  }

  private _setDateTimeToFields(dateTime?: Date | null): void {
    if (dateTime) {
      lbDate({ timezone: TimeZoneOptions.auto, precision: 3 }).run(() => {
        const isoDateTime = dateTime.toJSON().split('T')
        const date = isoDateTime[0]
        setValueToElement(this._elements.dateInput, date)
        const time = isoDateTime[1].substr(0, 8)
        setValueToElement(this._elements.timeInput, time)
      })
    } else {
      setValueToElement(this._elements.dateInput, '')
      setValueToElement(this._elements.timeInput, '')
    }
  }

  private _bindDomeEvents(): void {
    setEventListener('input', this._updateDateTimeFromInputs.bind(this), this._elements.form.elements)
    setEventListener('click', this._clearDateTime.bind(this), this._elements.clearDateTimeBtn)
    setEventListener('click', this._setCurrentDate.bind(this), this._elements.setCurrentDateBtn)
  }

  private _updateDateTimeFromInputs(): void {
    const date = getValueFromElement(this._elements.dateInput) as string
    if (!date) {
      this._observables.nextDateTime(null)
      return
    }
    let time = getValueFromElement(this._elements.timeInput) as string
    if (time) {
      let msStr = new Date().getMilliseconds().toString()
      if (msStr.length == 1) msStr = `00${msStr}`
      else if (msStr.length == 2) msStr = `0${msStr}`
      time += time.length == 8 ? `.${msStr}` : `:00.${msStr}`
    } else {
      time = '00:00:00'
    }
    this._observables.nextDateTime(new Date(`${date}T${time}`))
  }

  private _clearDateTime(): void {
    this._observables.nextDateTime(null)
    this._setDateTimeToFields()
  }

  private _setCurrentDate(): void {
    const dateTime = new Date()
    this._observables.nextDateTime(dateTime)
    this._setDateTimeToFields(dateTime)
  }
}
