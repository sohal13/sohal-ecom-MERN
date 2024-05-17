import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:4040/',
      secure:false,
      server:{
        host:true
      }
    }
    }
  },
  plugins: [react()],
})