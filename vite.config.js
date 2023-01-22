// vite.config.js
import { defineConfig } from 'vite'

export default {
    // config options
    root: './',
    build: {
        lib: {
            entry: './src/treeDiffer.ts',
            name: 'treeDiffer',
            fileName: (format) => `treeDiffer.${format}.js`,
        },
        outDir: './dist',
    },
    server: {
        open: 'demos/index.html',
  }
}