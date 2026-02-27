import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'
import fs from 'node:fs'
import path from 'node:path'
// import vueDevTools from 'vite-plugin-vue-devtools'

const manifestPath = path.resolve(__dirname, 'public/manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
const remoteNames = Object.keys(manifest.remotes) || []
const remotes = remoteNames.reduce((acc, name) => {
  acc[name] = `${name}-placeholder.js`
  return acc
}, {})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = env.NODE_ENV === 'development'
  const PORT = env.VITE_LOCAL_PORT || 5000
  const BASE = env.VITE_APP_BASE || 'host'
  const VERSION = env.VITE_APP_VERSION

  return {
    plugins: [
      vue(),
      UnoCSS(),
      federation({
        name: 'host',
        remotes,
        shared: {
          vue: {
            singleton: true,
            requiredVersion: '3.5.28',
            strictVersion: true,
          },
          pinia: {
            singleton: true,
            requiredVersion: '3.0.4',
            strictVersion: true,
          },
          'vue-router': {
            singleton: true,
            requiredVersion: '4.6.4',
            strictVersion: true,
          },
          '@scope/ui-lib': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'workspace:*',
          },
        },
      }),
      // isDev && vueDevTools(),
    ],
    base: (isDev || !VERSION) ? `http://localhost:${PORT}/` : `/${BASE}/${VERSION}/`,
    server: {
      port: PORT,
      strictPort: true,
      origin: `http://localhost:${PORT}`,
      cors: true,
    },
    build: {
      target: 'esnext',
      modulePreload: false,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
          assetFileNames: 'assets/[name].[ext]'
        },
      },
    },
    preview: {
      port: PORT,
      strictPort: true,
      cors: true,
    },
    optimizeDeps: {
      exclude: ['@scope/ui-lib'],
    },
}})
