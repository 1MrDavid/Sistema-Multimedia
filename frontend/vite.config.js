import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://web:8000",  // Usa el nombre del servicio de Django en Docker Compose
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
