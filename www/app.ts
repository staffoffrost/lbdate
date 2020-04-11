import { lbDate, TimeZoneOptions } from 'lbdate'
import { addEventListener, getElementById, getValueFromElement, setValueToElement } from './dom'
import { clearDateTimeFields, handleDateTimeChange, handleOptionsChange, setCurrentDate } from './events-callbacks'
import { ObservableService } from './observable.service'

const observableService = ObservableService.getObservableService()

export function bindDomEvents(): void {
  const domEventCompounds: [string, () => void, HTMLElement | null][] = [
    ['input', handleDateTimeChange, getElementById('dateInput')],
    ['input', handleDateTimeChange, getElementById('timeInput')],
    ['input', handleOptionsChange, getElementById('timeZoneInput')],
    ['input', handleOptionsChange, getElementById('manualTimeZoneOffsetInput')],
    ['input', handleOptionsChange, getElementById('originalToJsonNameInput')],
    ['input', handleOptionsChange, getElementById('precisionInput')],
    ['click', clearDateTimeFields, getElementById('clearDateTimeBtn')],
    ['click', setCurrentDate, getElementById('setCurrentDateBtn')],
  ]
  domEventCompounds.forEach(compound => {
    if (compound[2]) addEventListener(compound[0], compound[1], compound[2])
  })
}

export function subscribeToObservables(): void {
  subscribeToDateTimeChange()
}

function subscribeToDateTimeChange(): void {
  let isFirstRun = true
  observableService.onDateTimeChange(dateTime => {
    if (!dateTime) return
    const dateInput = getElementById('dateInput') as HTMLInputElement
    const timeInput = getElementById('timeInput') as HTMLInputElement
    const serializationResult = getElementById('serializationResult') as HTMLInputElement
    if (!dateInput || !timeInput || !serializationResult) return
    setValueToElement(serializationResult, dateTime.toJSON())
    if (!isFirstRun) return
    isFirstRun = false
    lbDate({ timezone: TimeZoneOptions.auto, precision: 3 }).run(() => {
      const isoDateTime = dateTime.toJSON().split('T')
      const date = isoDateTime[0]
      if (getValueFromElement(dateInput) != date) setValueToElement(dateInput, date)
      const time = isoDateTime[1].substr(0, 8)
      if (getValueFromElement(timeInput) != time) setValueToElement(timeInput, time)
    })
  })
}
