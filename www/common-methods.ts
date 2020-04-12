import { lbDate, LbDateOptions, TimeZoneOptions } from 'lbdate'
import { getElementById, getValueFromElement, hideElem, setValueToElement, showElem } from './dom'

export function setDateTimeInputs(dateTime: Date): void {
  const dateInput = getElementById('dateInput')
  const timeInput = getElementById('timeInput')
  if (!dateInput || !timeInput) return
  lbDate({ timezone: TimeZoneOptions.auto, precision: 3 }).run(() => {
    const isoDateTime = dateTime.toJSON().split('T')
    const date = isoDateTime[0]
    if (getValueFromElement(dateInput) != date) setValueToElement(dateInput, date)
    const time = isoDateTime[1].substr(0, 8)
    if (getValueFromElement(timeInput) != time) setValueToElement(timeInput, time)
  })
}

export function constructLbDateOptionsFromInputs(
  timeZoneInput: HTMLElement,
  manualTimeZoneOffsetInput: HTMLElement,
  originalToJsonNameInput: HTMLElement,
  precisionInput: HTMLElement,
): Partial<LbDateOptions> | null {
  const timeZoneInputValue = getValueFromElement(timeZoneInput)
  const manualTimeZoneOffsetInputValue = getValueFromElement(manualTimeZoneOffsetInput)
  const originalToJsonNameInputValue = getValueFromElement(originalToJsonNameInput)
  const precisionInputValue = getValueFromElement(precisionInput)
  const options: Partial<LbDateOptions> = {
    timezone: timeZoneInputValue.toLowerCase().includes('default') ? undefined : timeZoneInputValue as TimeZoneOptions,
    manualTimeZoneOffset: manualTimeZoneOffsetInputValue ? +manualTimeZoneOffsetInputValue : undefined,
    originalToJsonName: originalToJsonNameInputValue ? originalToJsonNameInputValue : undefined,
    precision: precisionInputValue ? +precisionInputValue : undefined,
  }
  for (const key in options) {
    if (options[key] === undefined) delete options[key]
  }
  return Object.keys(options).length ? options : null
}

export function isNullable(value: any): value is null | undefined {
  return value === null || value === undefined
}

export function setLbDateOptionsInput(
  timeZoneVal: string,
  manualTimeZoneOffsetVal: string,
  originalToJsonNameVal: string,
  precisionVal: string,
): void {
  const timeZoneInput = getElementById('timeZoneInput')
  if (timeZoneInput) setValueToElement(timeZoneInput, timeZoneVal)
  const manualTimeZoneOffsetInput = getElementById('manualTimeZoneOffsetInput')
  if (manualTimeZoneOffsetInput) setValueToElement(manualTimeZoneOffsetInput, manualTimeZoneOffsetVal)
  const originalToJsonNameInput = getElementById('originalToJsonNameInput')
  if (originalToJsonNameInput) setValueToElement(originalToJsonNameInput, originalToJsonNameVal)
  const precisionInput = getElementById('precisionInput')
  if (precisionInput) setValueToElement(precisionInput, precisionVal)
}

export function runAsync(callback: () => void): void {
  setTimeout(() => {
    callback()
  })
}

export function setLbDateStatus(isActive: boolean): void {
  const activeStatus = getElementById('activeStatus')
  const notActiveStatus = getElementById('notActiveStatus')
  if (!activeStatus || !notActiveStatus) return
  if (isActive) {
    showElem(activeStatus)
    hideElem(notActiveStatus)
  } else {
    hideElem(activeStatus)
    showElem(notActiveStatus)
  }
}
