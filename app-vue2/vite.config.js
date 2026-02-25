import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
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
