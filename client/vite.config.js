import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  cacheDir: '../node_modules/.vite',
  plugins: [react()],
  resolve: {
    preserveSymlinks: true
  },
  root: __dirname
})
