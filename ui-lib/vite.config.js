import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'
// import fs from 'fs'
// import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    federation({
      name: 'ui-lib',
      filename: 'remoteEntry.js',
      exposes: {
        './components': './src/components/index.js',
      },
      shared: {
        vue: {
          singleton: true,
          strictVersion: true,
        },
      },
    }),
  ],
  base: 'http://localhost:5001/',
  server: {
    port: 5001,
    strictPort: true,
  },
  build: {
    modulePreload: { resolveDependencies: () => [] },
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      external: ['vue'],
      output: {
        format: 'esm',
        globals: {
          vue: 'Vue'
        },
      },
    },
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@scope/design-tokens/scss/_vars.scss";`
  //     },
  //   }
  // },
  // resolve: {
  //   alias: {
  //      '@scope/design-tokens': path.resolve(__dirname, '../../packages/design-tokens'),
  //      '@scope/tokens': path.resolve(__dirname, '../../packages/theme'),
  //   },
  // }
})
