import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = env.NODE_ENV === 'development'
  const PORT = env.VITE_LOCAL_PORT || 5004
  const BASE = env.VITE_APP_BASE || 'app-vue2'
  const VERSION = env.VITE_APP_VERSION

  return {
    plugins: [
      vue(),
      UnoCSS(),
      federation({
        name: 'app-vue2',
        filename: 'remoteEntry.js',
        exposes: {
          './bootstrap': './src/bootstrap.js',
        },
      }),
    ],
    base: (isDev || !VERSION) ? '/' : `/${BASE}/${VERSION}/`,
    server: {
      port: PORT,
      strictPort: true,
      origin: `http://localhost:${PORT}`,
      cors: true,
    },
    build: {
      target: 'esnext',
      modulePreload: false,
      minify: false,
      cssCodeSplit: false,
    },
    preview: {
      port: PORT,
      strictPort: true,
      cors: true,
    },
}})
