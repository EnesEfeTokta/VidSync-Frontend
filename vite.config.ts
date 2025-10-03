import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: 
  [
    react(),
    basicSsl()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5166',
        changeOrigin: true,
        secure: false,
      },
      '/hub': {
        target: 'http://localhost:5166',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
    https: true,
  }
})