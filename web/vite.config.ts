import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['mqtt'], // ensures pre-bundling
  },
  server: {
    host: '0.0.0.0', // Important: expose to all interfaces
    port: 5173,
    strictPort: true,
  },
})
