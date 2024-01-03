import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://devverse-backend.cyclic.app',
        changeOrigin: true,
        secure: true,
        ws: true
      },
    },
  },
});
