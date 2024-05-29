import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      '/api': {
        target:process.env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
    },
    host: true,  // This should be outside the proxy configuration
  },
  plugins: [react()],
});
