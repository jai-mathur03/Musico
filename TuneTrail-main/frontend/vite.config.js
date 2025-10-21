import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ must match what server.js serves
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // optional alias for cleaner imports
    },
  },
  base: '/', // ✅ ensures correct asset paths when deployed
});
