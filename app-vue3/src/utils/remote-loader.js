import { defineAsyncComponent, h } from 'vue'

export function remoteUi(componentName) {
  return defineAsyncComponent({
    loader: () => import('ui-lib/components').then(m => {
      const component = m[componentName] || m.default?.[componentName]
      if (!component) {
        throw new Error(`Component ${componentName} not found in remote "ui-lib/components"`)
      }
      return component
    }),

    loadingComponent: {
      render: () => h('div', 'Loading...')
    },

    errorComponent: {
      render: () => h('div', { style: 'color: red' }, `Error loading ${componentName}`)
    },

    delay: 200,
    timeout: 5000,
  })
}
