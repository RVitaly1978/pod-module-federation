import { createApp } from 'vue'
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import App from './App.vue'
import { routesConfig, externalRemoteRoute } from './routes.config'

let app = null
let router = null

import 'virtual:uno.css'
import './style.css'

export const getRoutes = () => routesConfig.map(({ component, ...rest }) => rest)

export const mount = async ({
  domElement,
  initialPath,
  onNavigate,
  isStandalone = false,
}) => {
  router = createRouter({
    history: isStandalone ? createWebHistory() : createMemoryHistory(),
    routes: [...routesConfig, externalRemoteRoute],
  })

  if (initialPath) {
    await router.push(initialPath)
  }

  router.afterEach((to) => {
    if (onNavigate) {
      onNavigate({ pathname: to.fullPath })
    }
  })

  app = createApp(App)
  app.use(router)
  app.mount(domElement)

  return {
    onHostNavigate: ({ pathname }) => {
      if (router && router.currentRoute.value.fullPath !== pathname) {
        router.push(pathname)
      }
    }
  }
}

export const unmount = async () => {
  if (app) {
    app.unmount()
    app = null
  }
  if (router) {
    router = null
  }
}

export const bootstrap = async () => {
  console.log('[App-vue3] Initialized')
}
