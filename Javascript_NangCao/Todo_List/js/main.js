import { attach } from '../store.js'
import App from '../components/App.js'

const root = document.querySelector('#root')

attach(App, root)