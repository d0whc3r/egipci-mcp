// Test setup file for Vitest
import { vi } from 'vitest'

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
  log: vi.fn(),
}

// Mock process.exit to prevent tests from actually exiting
vi.stubGlobal('process', {
  ...process,
  exit: vi.fn(),
})
