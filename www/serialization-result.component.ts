import { getElementById, setValueToElement } from './dom'
import { ObservablesService } from './observables.service'

export class SerializationResultComponent {

  constructor(
    private _observables: ObservablesService,
  ) { }

  public init(): void {
    this._setObservers()
    this._setSerializationResultField(this._observables.getDateTime())
  }

  private _setObservers(): void {
    this._observables.onDateTimeChange(dateTime => {
      this._setSerializationResultField(dateTime)
    }, false)
    this._observables.onLbDateUpdate(() => {
      this._setSerializationResultField(this._observables.getDateTime())
    }, false)
  }

  private _setSerializationResultField(dateTime?: Date | null): void {
    const serializationResultField = getElementById('serializationResultField')
    const serializedValue = dateTime ? dateTime.toJSON() : ''
    if (serializationResultField) setValueToElement(serializationResultField, serializedValue)
  }
}
