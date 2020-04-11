import { lbDate } from 'lbdate'
import { bindDomEvents, subscribeToObservables } from './app'
import { onDomLoaded } from './dom'
import { ObservableService } from './observable.service'

const observableService = ObservableService.getObservableService()

onDomLoaded(() => {
  main()
})

function main(): void {
  const options = observableService.lbDateOptions;
  (options ? lbDate(options) : lbDate()).init()
  if (!observableService.dateTime) observableService.dateTime = new Date()
  bindDomEvents()
  subscribeToObservables()
}
