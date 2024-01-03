import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: `${import.meta.env.VITE_CL_DOMAIN}`,
        changeOrigin: true,
        secure: false,
        ws: true
      },
    },
  },
});
