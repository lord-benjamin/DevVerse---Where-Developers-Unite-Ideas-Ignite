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
  }); 
}
