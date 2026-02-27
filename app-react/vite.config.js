import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = env.NODE_ENV === 'development'
  const PORT = env.VITE_LOCAL_PORT || 5005
  const BASE = env.VITE_APP_BASE || 'app-react'
  const VERSION = env.VITE_APP_VERSION

  return {
    plugins: [
      react(),
      UnoCSS(),
      federation({
        name: 'app-react',
        filename: 'remoteEntry.js',
        exposes: {
          './bootstrap': './src/bootstrap.jsx'
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
