import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['mqtt'], // ensures pre-bundling
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        sw: resolve(__dirname, 'src/sw.ts')
      },
      output: {
        entryFileNames: chunk => {
          return chunk.name === 'sw' ? 'assets/js/sw.js' : 'assets/[name].[hash].js';
        },
      }
    }
  },
  server: {
    host: '0.0.0.0', // Important: expose to all interfaces
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://us-central1-bingoweb-466208.cloudfunctions.net/api/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
})
