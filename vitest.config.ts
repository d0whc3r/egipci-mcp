import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['src/test-setup.ts'],
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
    reporters: process.env.CI ? ['dot', 'github-actions', 'junit'] : ['default'],
    outputFile: {
      junit: './test-results/junit.xml',
    },
    coverage: {
      provider: 'v8',
      reporter: process.env.CI ? ['text', 'json-summary', 'lcov', 'cobertura'] : ['text', 'html'],
      exclude: ['node_modules/', 'dist/', 'dist-test/', 'coverage/', '**/*.d.ts', '**/*.config.{js,ts}', '**/index.ts'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules/', 'dist/', 'dist-test/'],
    // Optimize for CI
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: process.env.CI ? 2 : undefined,
        minThreads: process.env.CI ? 1 : undefined,
      },
    },
  },
})
