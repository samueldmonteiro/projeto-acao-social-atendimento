import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const swcPlugin = swc.vite({
  module: { type: 'es6' },
  jsc: {
    parser: {
      syntax: 'typescript',
      decorators: true,
    },
    transform: {
      decoratorMetadata: true,
    },
  },
});

/**
 * Base Vitest configuration.
 * Shared alias and SWC transform used by all test projects.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  plugins: [swcPlugin],

  test: {
    globals: true,
    environment: 'node',

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.it-spec.ts', 'src/generated/**'],
    },

    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.spec.ts'],
        },
      },

      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['test/**/*.e2e-spec.ts'],
          setupFiles: ['./test/setup.ts'],
          testTimeout: 30_000,
          hookTimeout: 60_000,
        },
      },

      {
        extends: true,
        test: {
          name: 'int',
          include: ['test/**/*.int-spec.ts'],
          setupFiles: ['./test/setup.ts'],
          testTimeout: 30_000,
          hookTimeout: 60_000,
        },
      },
    ],
  },
});