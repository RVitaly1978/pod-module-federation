import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initMfeRegistry } from './utils/init-mfe-registry'
import { initDynamicRemotes } from './utils/init-dynamic-remotes'

import '@unocss/reset/tailwind-compat.css'
import '@scope/design-tokens'
import 'virtual:uno.css'
import './style.css'

async function init() {
  try {
    await initDynamicRemotes()
  
    const app = createApp(App)
  
    const pinia = createPinia()
    app.use(pinia)
    await initMfeRegistry()
  
    app.use(router)
    app.mount('#host-app')
  } catch (error) {
    console.error('MFE Host: Initialization failed:', error)
  }
}

init()
