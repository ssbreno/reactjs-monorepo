import { defineConfig, mergeConfig, ViteUserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const baseConfig = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: resolve(__dirname, './setup.ts'),
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
      ],
    },
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    watch: false,
  },
});

export function createVitestConfig(config: ViteUserConfig = {}) {
  return mergeConfig(baseConfig, {
    ...config,
    test: {
      ...config.test,
      setupFiles: [
        resolve(__dirname, './setup.ts'),
        ...(config.test?.setupFiles || []),
      ],
    },
  });
}
