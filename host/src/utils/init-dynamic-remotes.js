import { __federation_method_setRemote } from '__federation__'

export async function initDynamicRemotes () {
  let remotesConfig = window.__MFE_RUNTIME_REMOTES__

  if (!remotesConfig) {
    console.warn('MFE Runtime: No remote configuration found in window.')
    // return

    // TODO: should be available only for running and building host locally
    try {
      const response = await fetch('/manifest.json')
      const manifest = await response.json()
      const overrides = JSON.parse(localStorage.getItem('MFE_OVERRIDE') || '{}')
    
      const resolveUrl = (p) => p.startsWith('http') ? p : window.location.origin + p
    
      remotesConfig = {}
      for (const [name, data] of Object.entries(manifest.remotes)) {
        const val = overrides[name]
        remotesConfig[name] = val?.startsWith('http') 
          ? val
          : resolveUrl(data.versions[val] || data.versions[data.active])
      }
    } catch (error) {
      console.error('MFE Runtime: Failed to register remotes:', error)
    }
  }

  const registrationPromises = Object.entries(remotesConfig).map(([name, url]) => {
    try {
      __federation_method_setRemote(name, {
        url: () => Promise.resolve(url),
        format: 'esm',
        from: 'vite',
      })
      return { name, status: 'registered' }
    } catch (error) {
      console.error(`MFE Runtime: Failed to register remote [${name}]`, error)
      return { name, status: 'failed', error }
    }
  })

  return Promise.all(registrationPromises)
}
