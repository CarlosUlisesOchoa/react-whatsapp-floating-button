import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
// import tsconfig from 'vite-plugin-tsconfig' // WIP: Temporary disabled. See note below.
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import autoprefixer from 'autoprefixer'

import { name } from './package.json'

// https://vitejs.dev/config/

/**
 * Removes everything before the last '/' in the package name
 * @musk/component-repo -> component-repo
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
    // tsconfig({ // WIP: Temporary disabled. This works for build but not for dev script.
    // TODO: Make a solution for this. It's necessary to keep working dev script too, not only build.
    //   filename: 'tsconfig.build.json',
    //   logLevel: 'info',
    // }),
    dts({
      insertTypesEntry: true,
      // tsconfigPath: path.resolve(__dirname, 'tsconfig.build.json'), // No longer needed since we are using vite-plugin-tsconfig (tsconfig({}))
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    minify: false, // TODO: Restore minification after debugging
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
