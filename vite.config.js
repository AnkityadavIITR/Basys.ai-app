import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vercel from 'vite-plugin-vercel';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: env.VITE_PORT || 4000, // Default to 3000 if VITE_PORT is not set
    },
    plugins: [
      react(),
      vercel(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': {
        ...process.env, // Spread process.env to include all env variables
        VITE_APP_ENV: env.VITE_VERCEL_ENV || 'development', // Custom env variable with fallback
      }
    }
  };
});
