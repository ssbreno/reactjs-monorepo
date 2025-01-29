import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { PluginOption } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ] as PluginOption[],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@monorepo/ui']
        },
      },
    },
  },
  server: {
    host: true,
    port: 5174,
    watch: {
      usePolling: true,
    }
  },
});
