import { lbDate } from 'lbdate'
import { isNullable, runAsync, setDateTimeInputs, setLbDateOptionsInput, setLbDateStatus } from './common-methods'
import { addClassToElem, addEventListener, getElementById, getValueFromElement, removeClassFromElem, setValueToElement } from './dom'
import { clearDateTimeFields, clearLbDateOptions, handleDateTimeChange, handleOptionsChange, restoreEnvironment, setCurrentDate } from './events-callbacks'
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
    ['click', clearLbDateOptions, getElementById('clearLbDateOptionsBtn')],
    ['click', restoreEnvironment, getElementById('restoreBtn')],
  ]
  domEventCompounds.forEach(compound => {
    if (compound[2]) addEventListener(compound[0], compound[1], compound[2])
  })
}

export function subscribeToObservables(): void {
  subscribeToDateTimeChange()
  subScribeToLbDateOptionsChange()
}

function subscribeToDateTimeChange(): void {
  let isFirstRun = true
  observableService.onDateTimeChange(dateTime => {
    setLbDateStatus(true)
    const serializationResult = getElementById('serializationResult')
    if (!dateTime || !serializationResult) return
    setValueToElement(serializationResult, dateTime.toJSON())
    if (!isFirstRun) return
    isFirstRun = false
    setDateTimeInputs(dateTime)
  })
}

function subScribeToLbDateOptionsChange(): void {
  let isFirstRun = true
  observableService.onLbDateOptionsChange(options => {
    setLbDateStatus(true)
    lbDate().restore();
    (options ? lbDate(options) : lbDate()).init()
    const dateTime = observableService.dateTime
    const serializationResult = getElementById('serializationResult')
    if (dateTime && serializationResult) setValueToElement(serializationResult, dateTime.toJSON())
    let timeZoneVal = 'Default'
    let manualTimeZoneOffsetVal = ''
    let originalToJsonNameVal = ''
    let precisionVal = ''
    if (options) {
      timeZoneVal = options.timezone ? options.timezone : timeZoneVal
      manualTimeZoneOffsetVal = isNullable(options.manualTimeZoneOffset) ? '' : options.manualTimeZoneOffset.toString()
      originalToJsonNameVal = options.originalToJsonName ? options.originalToJsonName : ''
      precisionVal = isNullable(options.precision) ? '' : options.precision.toString()
    }
    const originalToJsonMethodCode = getElementById('originalToJsonMethodCode')
    const actToJsonValue = lbDate().getGlobalConfig().originalToJsonName ?? lbDate().getDefaultConfig().originalToJsonName
    if (originalToJsonMethodCode) {
      setValueToElement(originalToJsonMethodCode, actToJsonValue)
    }
    const originalToJsonNameInput = getElementById('originalToJsonNameInput')
    if (originalToJsonNameInput) {
      runAsync(() => {
        const originalToJsonNameInputVal = getValueFromElement(originalToJsonNameInput)
        if (originalToJsonNameInputVal && originalToJsonNameInputVal !== actToJsonValue) {
          addClassToElem(originalToJsonNameInput, 'is-invalid')
        } else {
          removeClassFromElem(originalToJsonNameInput, 'is-invalid')
        }
      })
    }
    if (!isFirstRun) return
    isFirstRun = false
    setLbDateOptionsInput(timeZoneVal, manualTimeZoneOffsetVal, originalToJsonNameVal, precisionVal)
  })
}
