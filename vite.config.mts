import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import autoprefixer from 'autoprefixer'

import { name } from './package.json'

// https://vitejs.dev/config/

/**
 * Removes everything before the last '/' in the package name
 * @carlos8a/component-repo -> component-repo
 */

const formattedName = name.match(/[^/]+$/)?.[0] ?? 'index'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    cssInjectedByJsPlugin(),
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: formattedName,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
