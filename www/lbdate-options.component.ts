import { lbDate, LbDateOptions, TimeZoneOptions } from 'lbdate'
import { addClassToElem, getElementById, getValueFromElement, hideElem, removeClassFromElem, setEventListener, setValueToElement, showElem } from './dom'
import { LbDateOptionsForm } from './lbdate-options-form.model'
import { ObservablesService } from './observables.service'
import { getCurrentToJsonMethodName, isMethodInDatesPrototype, isNullable } from './utils'

const IS_INVALID_CLASS = 'is-invalid'
const LBDATE_IS_SHOW_SCOPED_RUN = 'lbdate-isShowScopedRun'

export class LbDateOptionsComponent {

  private _elements = {
    lbDateOptionsForm: getElementById('lbDateOptionsForm') as HTMLFormElement,
    timeZoneInput: getElementById('timeZoneInput') as HTMLSelectElement,
    manualTimeZoneOffsetInput: getElementById('manualTimeZoneOffsetInput') as HTMLInputElement,
    originalToJsonNameInput: getElementById('originalToJsonNameInput') as HTMLInputElement,
    precisionInput: getElementById('precisionInput') as HTMLInputElement,
    clearLbDateOptionsBtn: getElementById('clearLbDateOptionsBtn') as HTMLButtonElement,
    restoreBtn: getElementById('restoreBtn') as HTMLButtonElement,
    activeStatus: getElementById('activeStatus') as HTMLSpanElement,
    notActiveStatus: getElementById('notActiveStatus') as HTMLSpanElement,
    originalToJsonMethodCode: getElementById('originalToJsonMethodCode') as HTMLSpanElement,
    showScopedRunCheckbox: getElementById('showScopedRunCheckbox') as HTMLInputElement,
  }

  private _isShowScopedRun: boolean | null = null
  private get isShowScopedRun(): boolean {
    if (this._isShowScopedRun === null) {
      const storedVal = localStorage.getItem(LBDATE_IS_SHOW_SCOPED_RUN)
      this._isShowScopedRun = storedVal ? !!JSON.parse(storedVal) : false
    }
    return this._isShowScopedRun
  }
  private set isShowScopedRun(value: boolean) {
    localStorage.setItem(LBDATE_IS_SHOW_SCOPED_RUN, JSON.stringify(value))
    this._isShowScopedRun = value
  }

  constructor(
    private _observables: ObservablesService,
  ) { }

  public init(): void {
    this._setDomeEvents()
    this._setObservers()
    const options = this._observables.getLbDateOptions()
    const formFieldsValues = this._createLbDateOptionsFormValues(options)
    this._setLbDateOptionsFields(formFieldsValues)
    this._validateFormFields()
  }

  private _setDomeEvents(): void {
    setEventListener('input', event => {
      this._updateLbDateOptionsFromInputs()
      this._setLbDateStatus(true)
      if (event.target instanceof HTMLElement) this._handleRandomFieldValidation(event.target)
    },
      this._elements.lbDateOptionsForm.elements)
    setEventListener('click', () => {
      this._clearLbDateOptionsFields()
      this._observables.setLbDateOptions(null)
      this._setLbDateStatus(true)
      this._validateFormFields()
    },
      this._elements.clearLbDateOptionsBtn)
    setEventListener('click', () => {
      lbDate().restore()
      this._observables.lbDateUpdated()
      this._setLbDateStatus(false)
    },
      this._elements.restoreBtn)
    setEventListener('input', event => {
      if (event.target instanceof HTMLInputElement) {
        this.isShowScopedRun = event.target.checked
        this._showHideScopedRun(event.target.checked)
      }
    },
      this._elements.showScopedRunCheckbox)
  }

  private _setObservers(): void {
    this._observables.onLbDateUpdate(() => {
      this._updateOriginalToJsonCodeElem()
    })
  }

  private _updateLbDateOptionsFromInputs(): void {
    const form = this._getValuesFromForm()
    let options: Partial<LbDateOptions> | null = {}
    if (!form.timeZone.toLowerCase().includes('default')) options.timezone = form.timeZone as TimeZoneOptions
    if (form.manualTimeZoneOffset) options.manualTimeZoneOffset = +form.manualTimeZoneOffset
    if (form.originalToJsonName) options.originalToJsonName = form.originalToJsonName
    if (form.precision) options.precision = +form.precision
    if (!Object.keys(options).length) options = null
    this._observables.setLbDateOptions(options)
  }

  private _getValuesFromForm(): LbDateOptionsForm {
    return {
      timeZone: getValueFromElement(this._elements.timeZoneInput) as string,
      manualTimeZoneOffset: getValueFromElement(this._elements.manualTimeZoneOffsetInput) as string,
      originalToJsonName: getValueFromElement(this._elements.originalToJsonNameInput) as string,
      precision: getValueFromElement(this._elements.precisionInput) as string,
      isShowScopedRun: getValueFromElement(this._elements.showScopedRunCheckbox) as boolean
    }
  }

  private _createLbDateOptionsFormValues(options?: Partial<LbDateOptions> | null): LbDateOptionsForm {
    const form: LbDateOptionsForm = {
      timeZone: 'Default',
      manualTimeZoneOffset: '',
      originalToJsonName: '',
      precision: '',
      isShowScopedRun: this.isShowScopedRun,
    }
    if (options) {
      if (options.timezone) form.timeZone = options.timezone
      if (!isNullable(options.manualTimeZoneOffset)) form.manualTimeZoneOffset = options.manualTimeZoneOffset.toString()
      if (options.originalToJsonName) form.originalToJsonName = options.originalToJsonName
      if (!isNullable(options.precision)) form.precision = options.precision.toString()
    }
    return form
  }

  private _setLbDateOptionsFields(form: LbDateOptionsForm): void {
    setValueToElement(this._elements.timeZoneInput, form.timeZone)
    setValueToElement(this._elements.manualTimeZoneOffsetInput, form.manualTimeZoneOffset)
    setValueToElement(this._elements.originalToJsonNameInput, form.originalToJsonName)
    setValueToElement(this._elements.precisionInput, form.precision)
    setValueToElement(this._elements.showScopedRunCheckbox, form.isShowScopedRun)
  }

  private _clearLbDateOptionsFields(): void {
    const formFieldsValues = this._createLbDateOptionsFormValues()
    this._setLbDateOptionsFields(formFieldsValues)
  }

  private _setLbDateStatus(isActive: boolean): void {
    if (isActive) {
      showElem(this._elements.activeStatus)
      hideElem(this._elements.notActiveStatus)
    } else {
      hideElem(this._elements.activeStatus)
      showElem(this._elements.notActiveStatus)
    }
  }

  private _updateOriginalToJsonCodeElem(): void {
    const currentToJsonMethodName = getCurrentToJsonMethodName()
    setValueToElement(this._elements.originalToJsonMethodCode, currentToJsonMethodName)
  }

  private _handleRandomFieldValidation(element: HTMLElement): void {
    const value = getValueFromElement(element)
    const id = element.id
    const partialMethodName = id && id[0].toUpperCase() + id.slice(1)
    if (!partialMethodName) return
    const methodName = '_validate' + partialMethodName
    if (this[methodName]) this[methodName](value)
  }

  private _validateFormFields(): void {
    const form = this._getValuesFromForm()
    this._validateTimeZoneInput(form.timeZone)
    this._validateManualTimeZoneOffsetInput(form.manualTimeZoneOffset)
    this._validateOriginalToJsonNameInput(form.originalToJsonName)
    this._validatePrecisionInput(form.precision)
  }

  private _validateTimeZoneInput(value: string): void {
    const timeZoneOptions = [
      TimeZoneOptions.auto,
      TimeZoneOptions.manual,
      TimeZoneOptions.none,
      TimeZoneOptions.utc,
    ]
    if (timeZoneOptions.includes(value as TimeZoneOptions) || value.toLowerCase().includes('default')) {
      removeClassFromElem(this._elements.timeZoneInput, IS_INVALID_CLASS)
    } else {
      addClassToElem(this._elements.timeZoneInput, IS_INVALID_CLASS)
    }
  }

  private _validateManualTimeZoneOffsetInput(value: string): void {
    const num = +value
    if (isNaN(num) || num > 840 || num < -840) {
      addClassToElem(this._elements.manualTimeZoneOffsetInput, IS_INVALID_CLASS)
    } else {
      removeClassFromElem(this._elements.manualTimeZoneOffsetInput, IS_INVALID_CLASS)
    }
  }

  private _validateOriginalToJsonNameInput(value: string): void {
    const currentToJsonMethodName = getCurrentToJsonMethodName()
    const isMethodInDatesPrototypeResult = isMethodInDatesPrototype(value)
    if ((isMethodInDatesPrototypeResult && currentToJsonMethodName !== value) || value.length > 32) {
      addClassToElem(this._elements.originalToJsonNameInput, IS_INVALID_CLASS)
    } else {
      removeClassFromElem(this._elements.originalToJsonNameInput, IS_INVALID_CLASS)
    }
  }

  private _validatePrecisionInput(value: string): void {
    const num = +value
    if (isNaN(num) || num > 3 || num < 0) {
      addClassToElem(this._elements.precisionInput, IS_INVALID_CLASS)
    } else {
      removeClassFromElem(this._elements.precisionInput, IS_INVALID_CLASS)
    }
  }

  private _showHideScopedRun(show: boolean): void {
    console.log(show)
  }
}
