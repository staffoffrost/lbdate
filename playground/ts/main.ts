import 'firebase/analytics'
import firebase from 'firebase/app'
import { AppComponent } from './components/app.component'
import { onDomLoaded } from './utils/dom'

const firebaseConfig = {
  apiKey: 'AIzaSyB5DEtm9bf2REvtW_znFhPugO8Dtz-q19s',
  projectId: 'lbdate-dev',
  appId: '1:136590163892:web:2c7608ca199fc107a73ce1',
  measurementId: 'G-B22TXSKFST'
}

firebase.initializeApp(firebaseConfig)
if (window.location.hostname.toLowerCase().includes('lbdate-dev')) firebase.analytics()

onDomLoaded(() => {
  main()
})

function main(): void {
  const app = AppComponent.buildApp()
  app.init()
}
