import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routesConfig } from './routes.config'

const isDev = import.meta.env.DEV
const rootElement = document.getElementById('standalone-nav-panel')

if (isDev && rootElement) {
  import('@unocss/reset/tailwind-compat.css')
  import('@scope/design-tokens')
  import('virtual:uno.css')
  import('./style.css')

  const app = createApp(App)
  const router = createRouter({
    history: createWebHistory(),
    routes: routesConfig,
  })
  app.use(router)
  app.mount(rootElement)
}
