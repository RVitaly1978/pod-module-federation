import { __federation_method_setRemote } from '__federation__'

export async function mfeInit () {
  try {
    const response = await fetch('/manifest.json')
    const manifest = await response.json()
    let remotes = { ...manifest }

    const overrides = JSON.parse(localStorage.getItem('mfe-overrides') || '{}')
    remotes = { ...remotes, ...overrides }
    console.table(remotes)

    const registrationPromises = Object.entries(remotes).map(([name, url]) => {
      try {
        __federation_method_setRemote(name, {
          url: () => Promise.resolve(url),
          format: 'esm',
          from: 'vite'
        })
        return { name, status: 'registered' }
      } catch (error) {
        console.error(`MFE Runtime: Failed to register remote [${name}]`, error)
        return { name, status: 'failed', error }
      }
    })

    return Promise.all(registrationPromises)
  } catch (e) {
    console.error('[MFE Manifest] Failed to load Federation manifest:', e)
  }
}
