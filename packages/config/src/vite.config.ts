import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { PluginOption } from 'vite';
import { resolve } from 'path';

interface ConfigParams {
  port?: number;
  isLibrary?: boolean;
  dirname: string;
}

export function createViteConfig({ port = 5173, isLibrary = false, dirname }: ConfigParams): UserConfig {
  const baseConfig = defineConfig({
    plugins: [
      react(),
      tsconfigPaths()
    ] as PluginOption[],
    resolve: {
      alias: {
        '@': resolve(dirname, './src')
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  });

  if (isLibrary) {
    return mergeConfig(baseConfig, {
      build: {
        lib: {
          entry: resolve(dirname, 'src/index.ts'),
          formats: ['es', 'cjs'] as const,
          fileName: (format: 'es' | 'cjs') => `index.${format === 'es' ? 'mjs' : 'js'}`,
        },
      },
    });
  }

  return mergeConfig(baseConfig, {
    server: {
      host: true,
      port,
      watch: {
        usePolling: true,
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@monorepo/ui']
          },
        },
      },
    },
  });
}
