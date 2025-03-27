// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  cacheDir: '../node_modules/.vite',
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@admin': path.resolve(__dirname, './src/modules/admin'),
      '@user': path.resolve(__dirname, './src/modules/createRoute'),
      '@auth': path.resolve(__dirname, './src/modules/auth')
    },
    preserveSymlinks: true
  },
  root: __dirname
})
