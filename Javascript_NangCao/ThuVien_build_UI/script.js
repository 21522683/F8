import { attach } from "./store.js";
import App from './components/App.js'
// attach(component, root)

const root = document.querySelector('#root');

attach(App, root)