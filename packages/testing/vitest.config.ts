import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vite';

const baseConfig = defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['@monorepo/testing/setup'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types/**',
      ],
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    mockReset: true,
  },
});

export function createVitestConfig(config: UserConfig = {}) {
  return mergeConfig(baseConfig, {
    ...config,
    test: {
      ...config.test,
      setupFiles: [
        ...(baseConfig.test?.setupFiles || []),
        ...(config.test?.setupFiles || []),
      ],
    },
  });
}
