import { AppComponent } from './app.component'
import { onDomLoaded } from './dom'

onDomLoaded(() => {
  main()
})

function main(): void {
  const app = AppComponent.buildApp()
  app.init()
}

