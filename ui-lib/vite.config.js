import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const PORT = env.VITE_LOCAL_PORT || 5001

  return {
    plugins: [
      vue(),
      UnoCSS({ mode: 'vue-scoped' }),
    ],
    server: {
      port: PORT,
      strictPort: true,
    },
    build: {
      lib: {
        entry: './src/index.js',
        name: 'UiLib',
        fileName: 'ui-lib',
        formats: ['es']
      },
      target: 'esnext',
      minify: false,
      rollupOptions: {
        external: ['vue', 'vue-router', /@scope\/design-tokens/],
      },
    },
}})
