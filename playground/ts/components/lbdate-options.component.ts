import { lbDate, LbDateOptions, TimeZoneOptions } from 'lbdate'
import { ObservablesService } from '../services/observables.service'
import { addClassToElem, getElementById, getValueFromElement, hideElem, removeClassFromElem, setEventListener, setValueToElement, showElem } from '../utils/dom'
import { getCurrentToJsonMethodName, isMethodInDatesPrototype, isNullable } from '../utils/helpers'
import { LbDateOptionsForm } from '../utils/lbdate-options-form.model'

const IS_INVALID_CLASS = 'is-invalid'

export class LbDateOptionsComponent {

  private _elements = {
    lbDateOptionsForm: getElementById('lbDateOptionsForm') as HTMLFormElement,
    timeZoneInput: getElementById('timeZoneInput') as HTMLSelectElement,
    manualTimeZoneOffsetInput: getElementById('manualTimeZoneOffsetInput') as HTMLInputElement,
    toNativeJsonNameInput: getElementById('toNativeJsonNameInput') as HTMLInputElement,
    precisionInput: getElementById('precisionInput') as HTMLInputElement,
    clearLbDateOptionsBtn: getElementById('clearLbDateOptionsBtn') as HTMLButtonElement,
    restoreBtn: getElementById('restoreBtn') as HTMLButtonElement,
    activeStatus: getElementById('activeStatus') as HTMLSpanElement,
    notActiveStatus: getElementById('notActiveStatus') as HTMLSpanElement,
    toNativeJsonMethodCode: getElementById('toNativeJsonMethodCode') as HTMLSpanElement,
    showScopedRunCheckbox: getElementById('showScopedRunCheckbox') as HTMLInputElement,
    scopedRunContent: getElementById('scopedRunContent') as HTMLDivElement,
    scopedRunCodeResult: getElementById('scopedRunCodeResult') as HTMLSpanElement,
    scopedRunRequestCodeBtn: getElementById('scopedRunRequestCodeBtn') as HTMLButtonElement,
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
    this._showHideScopedRun(formFieldsValues.isShowScopedRun)
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
      this._observables.nextLbDateOptions(null)
      this._setLbDateStatus(true)
      this._validateFormFields()
    },
      this._elements.clearLbDateOptionsBtn)
    setEventListener('click', () => {
      lbDate().restore()
      this._observables.nextLbDateChange()
      this._setLbDateStatus(false)
    },
      this._elements.restoreBtn)
    setEventListener('click', event => {
      if (event.target instanceof HTMLInputElement) {
        this._observables.nextIsShowScopedRun(event.target.checked)
      }
    },
      this._elements.showScopedRunCheckbox)
    setEventListener('click', () => this._observables.nextNewScopedRunRequest(), this._elements.scopedRunRequestCodeBtn)
  }

  private _setObservers(): void {
    this._observables.onLbDateChange(() => {
      this._updateToNativeJsonCodeElem()
    })
    this._observables.onIsShowScopedRunChange(this._showHideScopedRun.bind(this))
    this._observables.onScopedRunResultChange(this._setScopedRunSerializationResult.bind(this))
  }

  private _updateLbDateOptionsFromInputs(): void {
    const form = this._getValuesFromForm()
    let options: Partial<LbDateOptions> | null = {}
    if (!form.timeZone.toLowerCase().includes('default')) options.timezone = form.timeZone as TimeZoneOptions
    if (form.manualTimeZoneOffset) options.manualTimeZoneOffset = +form.manualTimeZoneOffset
    if (form.toNativeJsonName) options.toNativeJsonName = form.toNativeJsonName
    if (form.precision) options.precision = +form.precision
    if (!Object.keys(options).length) options = null
    this._observables.nextLbDateOptions(options)
  }

  private _getValuesFromForm(): LbDateOptionsForm {
    return {
      timeZone: getValueFromElement(this._elements.timeZoneInput) as string,
      manualTimeZoneOffset: getValueFromElement(this._elements.manualTimeZoneOffsetInput) as string,
      toNativeJsonName: getValueFromElement(this._elements.toNativeJsonNameInput) as string,
      precision: getValueFromElement(this._elements.precisionInput) as string,
      isShowScopedRun: getValueFromElement(this._elements.showScopedRunCheckbox) as boolean
    }
  }

  private _createLbDateOptionsFormValues(options?: Partial<LbDateOptions> | null): LbDateOptionsForm {
    const form: LbDateOptionsForm = {
      timeZone: 'Default',
      manualTimeZoneOffset: '',
      toNativeJsonName: '',
      precision: '',
      isShowScopedRun: this._observables.getIsShowScopedRun(),
    }
    if (options) {
      if (options.timezone) form.timeZone = options.timezone
      if (!isNullable(options.manualTimeZoneOffset)) form.manualTimeZoneOffset = options.manualTimeZoneOffset.toString()
      if (options.toNativeJsonName) form.toNativeJsonName = options.toNativeJsonName
      if (!isNullable(options.precision)) form.precision = options.precision.toString()
    }
    return form
  }

  private _setLbDateOptionsFields(form: LbDateOptionsForm): void {
    setValueToElement(this._elements.timeZoneInput, form.timeZone)
    setValueToElement(this._elements.manualTimeZoneOffsetInput, form.manualTimeZoneOffset)
    setValueToElement(this._elements.toNativeJsonNameInput, form.toNativeJsonName)
    setValueToElement(this._elements.precisionInput, form.precision)
    setValueToElement(this._elements.showScopedRunCheckbox, form.isShowScopedRun)
  }

  private _clearLbDateOptionsFields(): void {
    const formFieldsValues = this._createLbDateOptionsFormValues()
    formFieldsValues.isShowScopedRun = false
    this._setLbDateOptionsFields(formFieldsValues)
    this._observables.nextIsShowScopedRun(false)
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

  private _updateToNativeJsonCodeElem(): void {
    const currentToJsonMethodName = getCurrentToJsonMethodName()
    setValueToElement(this._elements.toNativeJsonMethodCode, currentToJsonMethodName)
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
    this._validateToNativeJsonNameInput(form.toNativeJsonName)
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

  private _validateToNativeJsonNameInput(value: string): void {
    const currentToJsonMethodName = getCurrentToJsonMethodName()
    const isMethodInDatesPrototypeResult = isMethodInDatesPrototype(value)
    if ((isMethodInDatesPrototypeResult && currentToJsonMethodName !== value) || value.length > 32) {
      addClassToElem(this._elements.toNativeJsonNameInput, IS_INVALID_CLASS)
    } else {
      removeClassFromElem(this._elements.toNativeJsonNameInput, IS_INVALID_CLASS)
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
    show ? showElem(this._elements.scopedRunContent) : hideElem(this._elements.scopedRunContent)
  }

  private _setScopedRunSerializationResult(value: string | null): void {
    setValueToElement(this._elements.scopedRunCodeResult, value || '')
  }
}
