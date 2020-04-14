import { getElementById, hideElem, setEventListener, setValueToElement, showElem } from './dom'
import { ObservablesService } from './observables.service'

export class SerializationResultComponent {

  private _elements = {
    serializationResultField: getElementById('serializationResultField') as HTMLInputElement,
    scopedRunResult: getElementById('scopedRunResult') as HTMLDivElement,
    scopedRunResultField: getElementById('scopedRunResultField') as HTMLInputElement,
    scopedRunRequestBtn: getElementById('scopedRunRequestBtn') as HTMLButtonElement,
  }

  constructor(
    private _observables: ObservablesService,
  ) { }

  public init(): void {
    this._setDomEvents()
    this._setObservers()
    this._setSerializationResultField(this._observables.getDateTime())
  }

  private _setDomEvents(): void {
    setEventListener('click', () => this._observables.nextNewScopedRunRequest(), this._elements.scopedRunRequestBtn)
  }

  private _setObservers(): void {
    this._observables.onDateTimeChange(dateTime => {
      this._setSerializationResultField(dateTime)
    }, false)
    this._observables.onLbDateChange(() => {
      this._setSerializationResultField(this._observables.getDateTime())
    }, false)
    this._observables.onIsShowScopedRunChange(this._showHideScopedRunResult.bind(this))
    this._observables.onScopedRunResultChange(this._setScopedRunSerializationResult.bind(this))
  }

  private _setSerializationResultField(dateTime?: Date | null): void {
    const serializedValue = dateTime ? dateTime.toJSON() : ''
    setValueToElement(this._elements.serializationResultField, serializedValue)
  }

  private _showHideScopedRunResult(show: boolean): void {
    show ? showElem(this._elements.scopedRunResult) : hideElem(this._elements.scopedRunResult)
  }

  private _setScopedRunSerializationResult(value: string | null): void {
    setValueToElement(this._elements.scopedRunResultField, value || '')
  }
}
