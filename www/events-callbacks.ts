import { lbDate, TimeZoneOptions } from 'lbdate'
import { getElementById, getValueFromElement, setValueToElement } from './dom'
import { ObservableService } from './observable.service'

const observableService = ObservableService.getObservableService()

export function handleDateTimeChange(): void {
  const dateInput = getElementById('dateInput') as HTMLInputElement
  const timeInput = getElementById('timeInput') as HTMLInputElement
  const serializationResult = getElementById('serializationResult') as HTMLInputElement
  if (!dateInput || !timeInput || !serializationResult) return
  const date = getValueFromElement(dateInput)
  let time = getValueFromElement(timeInput)
  if (!date) {
    setValueToElement(serializationResult, '')
    observableService.dateTime = null
    return
  }
  if (time) {
    let milliseconds = new Date().getMilliseconds().toString()
    milliseconds = milliseconds.length == 1 ? `00${milliseconds}` : milliseconds.length == 2 ? `0${milliseconds}` : milliseconds
    time += time.length == 8 ? '.' + milliseconds : ':00.' + milliseconds
  } else {
    time = '00:00:00'
  }
  observableService.dateTime = new Date(`${date}T${time}`)
}

export function clearDateTimeFields(): void {
  const dateInput = getElementById('dateInput') as HTMLInputElement
  const timeInput = getElementById('timeInput') as HTMLInputElement
  const serializationResult = getElementById('serializationResult') as HTMLInputElement
  if (!dateInput || !timeInput || !serializationResult) return
  setValueToElement(dateInput, '')
  setValueToElement(timeInput, '')
  setValueToElement(serializationResult, '')
  observableService.dateTime = null
}

export function setCurrentDate(): void {
  const dateTime = new Date()
  observableService.dateTime = dateTime
  const dateInput = getElementById('dateInput') as HTMLInputElement
  const timeInput = getElementById('timeInput') as HTMLInputElement
  lbDate({ timezone: TimeZoneOptions.auto, precision: 3 }).run(() => {
    const isoDateTime = dateTime.toJSON().split('T')
    const date = isoDateTime[0]
    if (getValueFromElement(dateInput) != date) setValueToElement(dateInput, date)
    const time = isoDateTime[1].substr(0, 8)
    if (getValueFromElement(timeInput) != time) setValueToElement(timeInput, time)
  })
}

export function handleOptionsChange(): void {

}
