import { defineConfig,loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import * as dotenv from 'dotenv';
// dotenv.config()

// https://vitejs.dev/config/
export default({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  // process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    plugins: [react()],
    server: {
      // host: true,
      proxy: {
        '/api': {
          target: process.env.VITE_CL_DOMAIN,
          changeOrigin: true,
          // secure: false,
          // ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }); 
}
