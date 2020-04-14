import { AppComponent } from './components/app.component'
import { onDomLoaded } from './utils/dom'

onDomLoaded(() => {
  main()
})

function main(): void {
  const app = AppComponent.buildApp()
  app.init()
}

