import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    cssInjectedByJsPlugin(),
    federation({
      name: 'app-vue2',
      filename: 'remoteEntry.js',
      exposes: {
        './bootstrap': './src/bootstrap.js',
      },
    }),
  ],
  base: 'http://localhost:5004/',
  server: {
    port: 5004,
    strictPort: true,
  },
  build: {
    modulePreload: { resolveDependencies: () => [] },
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        format: 'esm'
      }
    },
  },
  preview: {
    port: 5004,
    strictPort: true,
    cors: true,
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
})
