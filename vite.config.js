import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT,
  },
  plugins: [react(),vercel()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})