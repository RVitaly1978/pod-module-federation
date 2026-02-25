import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
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
        name: 'app-vue3',
        filename: 'remoteEntry.js',
        remotes: {
          'ui-lib': '/ui-lib/v1.0.0/assets/remoteEntry.js'
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
    base: (env.NODE_ENV === 'development' || !VERSION) ? `http://localhost:${PORT}/` : `/${BASE}/${VERSION}/`,
    server: {
      port: PORT,
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
      port: PORT,
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
}})
