import { __federation_method_setRemote } from '__federation__'

export async function mfeInit () {
  const isDev = import.meta.env.DEV
  const manifestUrl = isDev ? '/manifest.json' : `${import.meta.env.VITE_HOST_SERVER_URL}/manifest.json`

  try {
    const response = await fetch(manifestUrl)
    const manifest = await response.json()
    let remotes = { ...manifest }

    if (isDev) {
      const overrides = JSON.parse(localStorage.getItem('mfe-overrides') || '{}')
      remotes = { ...remotes, ...overrides }
      console.table(remotes)
    }

    Object.keys(remotes).map((name) => {
      const url = remotes[name]

      __federation_method_setRemote(name, {
        url: () => Promise.resolve(url),
        format: 'esm',
        from: 'vite'
      })
    })
  } catch (e) {
    console.error('[MFE Manifest] Failed to load Federation manifest:', e)
  }
}
