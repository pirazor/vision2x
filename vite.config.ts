import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Add explicit asset handling
  assetsInclude: ['**/*.webm', '**/*.mp4', '**/*.png', '**/*.jpg', '**/*.jpeg'],
  // Ensure public assets are copied correctly
  publicDir: 'public',
  build: {
    // Ensure large assets are not inlined
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
});