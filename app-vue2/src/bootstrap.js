import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import { routesConfig } from './routes.config'

let router = null
let vm = null

import 'virtual:uno.css'
import './style.css'

export const getRoutes = () => routesConfig.map(({ component, ...rest }) => rest)

export const mount = async ({
  domElement,
  initialPath,
  onNavigate,
  isStandalone = false,
}) => {
  Vue.config.productionTip = false
  Vue.use(Router)

  router = new Router({
    mode: isStandalone ? 'history' : 'abstract',
    routes: routesConfig,
  })

  if (initialPath) {
    await router.push(initialPath)
  }

  router.afterEach((to) => {
    if (onNavigate) {
      onNavigate({ pathname: to.fullPath })
    }
  })

  vm = new Vue({
    router,
    render: (h) => h(App),
  }).$mount()
  domElement.appendChild(vm.$el)

  return {
    onHostNavigate: ({ pathname }) => {
      if (router && router.currentRoute.path !== pathname) {
        router.push(pathname)
          // .catch(() => {})
      }
    }
  }
}

export const unmount = async () => {
  if (vm) {
    vm.$destroy()
    if (vm.$el?.parentNode) {
      vm.$el.parentNode.removeChild(vm.$el)
    }
    vm = null
  }
  if (router) {
    router = null
  }
}

export const bootstrap = async () => {
  console.log('[App-vue2] Initialized')
}
