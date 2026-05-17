import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'vendor';
          }
          if (id.includes('framer-motion') || id.includes('lucide-react')) {
            return 'ui';
          }
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('yup')) {
            return 'forms';
          }
          if (id.includes('i18next')) {
            return 'i18n';
          }
          if (id.includes('zustand')) {
            return 'state';
          }
          if (id.includes('axios')) {
            return 'utils';
          }
          if (id.includes('swiper')) {
            return 'swiper';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: true,
    target: 'es2015'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**'],
  }
})
