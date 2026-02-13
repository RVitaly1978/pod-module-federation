import { defineConfig } from 'unocss'
import { baseUnoConfig } from '@scope/config-unocss'

export default defineConfig({
  ...baseUnoConfig,
  content: {
    pipeline: {
      include: [
        /\.([jt]sx|ts|js)($|\?)/,
      ]
    },
  }
})
