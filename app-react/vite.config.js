import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    cssInjectedByJsPlugin(),
    federation({
      name: 'app-react',
      filename: 'remoteEntry.js',
      exposes: {
        './bootstrap': './src/bootstrap.jsx'
      },
    }),
  ],
  base: 'http://localhost:5005/',
  server: {
    port: 5005,
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
    port: 5005,
    strictPort: true,
    cors: true,
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
})
