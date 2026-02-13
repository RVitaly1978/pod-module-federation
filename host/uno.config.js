import { defineConfig } from 'unocss'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { baseUnoConfig } from '@scope/config-unocss'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  ...baseUnoConfig,
  content: {
    pipeline: {
      include: [
        /\.(vue|ts|js|jsx|tsx)($|\?)/,
      ]
    },
    filesystem: [
      // resolve(__dirname, '../app-vue3/src/**/*.vue'),
      // resolve(__dirname, '../app-vue2/src/**/*.vue'),
      // resolve(__dirname, '../app-react/src/**/*.jsx'),
      resolve(__dirname, '../nav-panel/src/**/*.vue'),
      resolve(__dirname, './node_modules/@scope/ui-lib/src/**/*.vue'),
    ]
  }
})
