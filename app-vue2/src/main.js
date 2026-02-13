import { mount } from './bootstrap'

const isDev = import.meta.env.DEV
const rootElement = document.getElementById('standalone-app-vue2')

if (isDev && rootElement) {
  import('@unocss/reset/tailwind-compat.css')
  import('@scope/design-tokens')

  mount({
    domElement: rootElement,
    initialPath: window.location.pathname,
    onNavigate: (ev) => { console.log('[Dev Navigation]', ev) },
    isStandalone: true,
  })
}