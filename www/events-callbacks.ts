import { lbDate } from 'lbdate'
import { constructLbDateOptionsFromInputs, runAsync, setDateTimeInputs, setLbDateOptionsInput, setLbDateStatus } from './common-methods'
import { getElementById, getValueFromElement, setValueToElement } from './dom'
import { ObservableService } from './observable.service'

const observableService = ObservableService.getObservableService()

export function handleDateTimeChange(): void {
  const dateInput = getElementById('dateInput')
  const timeInput = getElementById('timeInput')
  const serializationResult = getElementById('serializationResult')
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
  const dateInput = getElementById('dateInput')
  const timeInput = getElementById('timeInput')
  const serializationResult = getElementById('serializationResult')
  if (!dateInput || !timeInput || !serializationResult) return
  setValueToElement(dateInput, '')
  setValueToElement(timeInput, '')
  setValueToElement(serializationResult, '')
  observableService.dateTime = null
}

export function setCurrentDate(): void {
  const dateTime = new Date()
  observableService.dateTime = dateTime
  setDateTimeInputs(dateTime)
}

export function handleOptionsChange(): void {
  const timeZoneInput = getElementById('timeZoneInput')
  const manualTimeZoneOffsetInput = getElementById('manualTimeZoneOffsetInput')
  const originalToJsonNameInput = getElementById('originalToJsonNameInput')
  const precisionInput = getElementById('precisionInput')
  if (!timeZoneInput || !manualTimeZoneOffsetInput || !originalToJsonNameInput || !precisionInput) return
  const options = constructLbDateOptionsFromInputs(
    timeZoneInput,
    manualTimeZoneOffsetInput,
    originalToJsonNameInput,
    precisionInput,
  )
  observableService.lbDateOptions = options
}

export function clearLbDateOptions(): void {
  observableService.lbDateOptions = null
  setLbDateOptionsInput('Default', '', '', '')
}

export function restoreEnvironment(): void {
  clearLbDateOptions()
  runAsync(() => {
    lbDate().restore()
    const dateTime = observableService.dateTime
    const serializationResult = getElementById('serializationResult')
    if (!serializationResult || !dateTime) return
    setValueToElement(serializationResult, dateTime.toJSON())
    setLbDateStatus(false)
  })
}
