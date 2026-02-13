import { mfeApps } from '../config/mfe.config'
import { useMfeRoutesStore } from '../stores/mfe-routes'

export async function initMfeRegistry () {
  const store = useMfeRoutesStore()

  await Promise.all(mfeApps.map(async (appConfig) => {
    try {
      const module = await appConfig.loader()
      if (module.getRoutes) {
        store.registerAppRoutes(appConfig.name, module.getRoutes())
      }
    } catch (err) {
      console.error(`[Host] Failed to load routes for ${appConfig.name}:`, err)
    }
  }))
}
