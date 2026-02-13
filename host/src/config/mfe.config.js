import MfeGenericError from '../components/MfeGenericError.vue'
import { loadModule } from '../utils/load-module'

export const mfeApps = [
  {
    name: 'app-vue3',
    type: 'vue3',
    baseUrl: '/app-vue3',
    loader: () => loadModule(() => import('app-vue3/bootstrap')),
    errorComponent: MfeGenericError,
    order: 1,
  },
  {
    name: 'app-vue2',
    type: 'vue2',
    baseUrl: '/app-vue2',
    loader: () => loadModule(() => import('app-vue2/bootstrap')),
    errorComponent: MfeGenericError,
    order: 2,
  },
  {
    name: 'app-react',
    type: 'react',
    baseUrl: '/app-react',
    loader: () => loadModule(() => import('app-react/bootstrap')),
    errorComponent: MfeGenericError,
    order: 3,
  },
]