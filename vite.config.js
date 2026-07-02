import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',          // works on any static host (GitHub Pages, Netlify, Vercel)
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
