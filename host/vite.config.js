import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"
import UnoCSS from 'unocss/vite'
import fs from 'node:fs'
import path from 'node:path'
// import vueDevTools from 'vite-plugin-vue-devtools'
// import autoprefixer from 'autoprefixer'
// import prefixer from 'postcss-prefix-selector'

const manifestPath = path.resolve(__dirname, 'public/manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
const remoteNames = Object.keys(manifest.remotes) || []
const remotes = remoteNames.reduce((acc, name) => {
  acc[name] = `${name}-placeholder.js`
  return acc
}, {})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const PORT = env.VITE_LOCAL_PORT
  const BASE = env.VITE_APP_BASE
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
        },
      }),
      // vueDevTools(),
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
      target: 'esnext',
      cssCodeSplit: false,
      rollupOptions: {
        external: remoteNames,
        output: {
          entryFileNames: 'index.js',
          assetFileNames: 'assets/[name].[ext]'
        },
      },
    },
    preview: {
      port: PORT,
      strictPort: true,
    },
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    },
    optimizeDeps: {
      exclude: [...remoteNames.map((remote) => `@scope/${remote}`)],
    },

    // css: {
    //   postcss: {
    //     plugins: [
    //       prefixer({
    //         prefix: '.tailwind-on', // Adds prefix to all Tailwind styles
    //         transform(prefix, selector, prefixedSelector, filePath, rule) {
    //           if (selector.match(/^(:root|:host)/)) {
    //             return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
    //           }
        
    //           if (filePath.match(/vue2/)) {
    //             return selector; // Do not prefix styles imported from node_modules
    //           }
        
    //           const annotation = rule.prev();
    //           if (annotation?.type === 'comment' && annotation.text.trim() === 'no-prefix') {
    //             return selector; // Do not prefix style rules that are preceded by: /* no-prefix */
    //           }
        
    //           return prefixedSelector;
    //         },
    //       }),
    //       autoprefixer({}),
    //     ],
    //   }
    // },
}})
