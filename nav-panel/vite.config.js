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
      name: 'nav-panel',
      filename: 'remoteEntry.js',
      remotes: {
        'ui-lib': 'http://localhost:5001/assets/remoteEntry.js'
      },
      exposes: {
        './NavigationPanel': './src/components/NavigationPanel.vue'
      },
      shared: {
        vue: {
          singleton: true,
          strictVersion: true,
          requiredVersion: '3.5.28',
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '4.6.4',
          strictVersion: true,
        },
      },
    }),
  ],
  base: 'http://localhost:5002/',
  server: {
    port: 5002,
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
    port: 5002,
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
