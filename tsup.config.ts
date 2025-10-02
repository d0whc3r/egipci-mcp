import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  const isProd = Boolean(options.env?.prod)

  return {
    entry: ['src/index.ts'],
    format: ['esm'],
    target: 'node18',
    outDir: 'dist',
    clean: true,
    sourcemap: !isProd,
    minify: isProd,
    bundle: true,
    external: ['@modelcontextprotocol/sdk', 'got', 'zod'],
  }
})
