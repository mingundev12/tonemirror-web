import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:8080", // 스프링 (어드민·상품)
      "/ai": "http://localhost:8000",  // 파이썬 (진단·가상 메이크업)
    },
  },
})