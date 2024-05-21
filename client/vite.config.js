import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target:'https://sohal-ecom-mern-backend.onrender.com',
        changeOrigin: true,
        secure: true, 
      },
    },
    host: true,  // This should be outside the proxy configuration
  },
  plugins: [react()],
});
