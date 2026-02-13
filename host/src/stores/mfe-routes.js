import { defineStore } from 'pinia'

// export type MfeStatus = 'loading' | 'online' | 'error' | 'idle'

export const useMfeRoutesStore = defineStore('mfe-routes', {
  state: () => ({
    registry: [],
    appStatuses: {},
  }),
  actions: {
    registerAppRoutes(appName, routes) {
      const routesWithApp = routes.map((r) => ({ ...r, appName }))
      this.registry.push(...routesWithApp)
    },
    setAppStatus(appName, status) {
      this.appStatuses[appName] = status
    },
  },
})
