import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/pokemon-tamagotchi/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
