import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
