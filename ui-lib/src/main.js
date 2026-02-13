import { createApp } from 'vue'
import App from './App.vue'

const isDev = import.meta.env.DEV
const rootElement = document.getElementById('standalone-ui')

if (isDev && rootElement) {
  import('@unocss/reset/tailwind-compat.css')
  import('@scope/design-tokens')
  import('virtual:uno.css')
  import('./style.css')
  
  createApp(App).mount(rootElement)
}
