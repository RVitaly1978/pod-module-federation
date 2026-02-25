import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const PORT = env.VITE_LOCAL_PORT
  const BASE = env.VITE_APP_BASE
  const VERSION = env.VITE_APP_VERSION

  return {
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
    base: (env.NODE_ENV === 'development' || !VERSION) ? `http://localhost:${PORT}/` : `/${BASE}/${VERSION}/`,
    server: {
      port: PORT,
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
      port: PORT,
      strictPort: true,
      cors: true,
    },
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    },
}})
