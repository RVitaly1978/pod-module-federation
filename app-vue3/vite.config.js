import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    cssInjectedByJsPlugin(),
    federation({
      name: 'app-vue3',
      filename: 'remoteEntry.js',
      remotes: {
        'ui-lib': 'http://localhost:5001/assets/remoteEntry.js'
      },
      exposes: {
        './bootstrap': './src/bootstrap.js',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '3.5.28',
          strictVersion: true,
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '4.6.4',
          strictVersion: true,
        },
      },
    }),
  ],
  base: 'http://localhost:5003/',
  server: {
    port: 5003,
    strictPort: true,
    fs: {
      allow: ['..'] 
    },
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
    port: 5003,
    strictPort: true,
    cors: true,
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  optimizeDeps: {
    exclude: ['@scope/ui-lib'],
  },
})
