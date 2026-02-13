import { createRouter, createWebHistory } from 'vue-router'
import { routesConfig } from './routes.config'

const remoteContainerRoute = {
  path: `/:appName/:pathMatch(.*)*`,
  name: 'remote-container',
  component: () => import('../components/RemoteAppWrapper.vue'),
  props: true,
}

const router = createRouter({
  history: createWebHistory(),
  routes: [...routesConfig, remoteContainerRoute]
})

export default router
