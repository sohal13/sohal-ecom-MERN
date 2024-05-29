import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      '/api': {
        target:'http://localhost:4040',
        changeOrigin: true,
      },
    },
    host: true,  // This should be outside the proxy configuration
  },
  plugins: [react()],
});
