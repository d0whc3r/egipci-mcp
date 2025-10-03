---
inclusion: *.test.ts
---

# Testing Guidelines

## Testing Framework & Configuration

### Vitest Setup

- **Test Runner**: Vitest with Node.js environment and global test functions
- **Coverage Provider**: V8 with 80% threshold for branches, functions, lines, and statements
- **Test Files**: `*.test.ts` or `*.spec.ts` in `src/` directory, co-located with source files
- **Setup File**: `src/test-setup.ts` for global test configuration and mocks

### Test Commands

```bash
pnpm test           # Run tests once
pnpm test:watch     # Watch mode for development
pnpm test:coverage  # Generate coverage report
pnpm test:ci        # CI mode with JUnit and coverage reports
```

## Testing Patterns & Conventions

### File Structure

- Place test files adjacent to source files: `module-name.test.ts`
- Use descriptive `describe` blocks for modules and functions
- Group related tests with nested `describe` blocks
- Use clear, behavior-focused test names with `it('should...')`

### Import Patterns

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { functionToTest } from './module-name.js' // Use .js extension
```

### Mocking Strategy

- **External Dependencies**: Mock HTTP clients (got), file system, and external APIs
- **Global Mocks**: Console methods and process.exit are pre-mocked in test-setup.ts
- **Module Mocking**: Use `vi.mock()` for external modules, preserve original exports when needed
- **Function Mocking**: Use `vi.fn()` for individual function mocks

### Test Structure Template

```typescript
describe('ModuleName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('functionName', () => {
    it('should handle normal case', () => {
      // Arrange, Act, Assert pattern
    })

    it('should handle edge cases', () => {
      // Test boundary conditions
    })

    it('should handle error conditions', () => {
      // Test error scenarios
    })
  })
})
```

## Specific Testing Requirements

### HTTP Client Testing

- Mock `got` library completely while preserving error classes
- Test both successful responses and error conditions (HTTPError, RequestError)
- Verify correct headers, body content, and URL parameters
- Test XML response validation and error handling

### Error Handling Tests

- Test all error types: HTTPError, RequestError, ValidationError, unknown errors
- Verify error message formatting and context information
- Test error propagation through the call stack

### Environment Variable Testing

- Test both presence and absence of required environment variables
- Clean up environment state in `beforeEach`/`afterEach` hooks
- Test fallback behavior when environment variables are missing

### XML Processing Tests

- Test XML payload generation with various input types
- Verify XML encoding and structure
- Test XML response validation (valid XML vs invalid content)
- Handle special characters and edge cases in XML content

## Coverage Requirements

### Minimum Thresholds (80%)

- **Branches**: All conditional logic paths
- **Functions**: All exported and internal functions
- **Lines**: All executable code lines
- **Statements**: All code statements

### Coverage Exclusions

- Configuration files (`*.config.ts`)
- Type definitions (`*.d.ts`)
- Main entry point (`index.ts`) - focus on unit testing individual modules
- Build artifacts and dependencies

## Best Practices

### Test Quality

- Write tests that describe behavior, not implementation
- Use meaningful assertions with specific expected values
- Test one concept per test case
- Avoid testing implementation details, focus on public interfaces

### Mock Management

- Clear mocks between tests to prevent test pollution
- Use `vi.mocked()` for type-safe mock access
- Restore mocks after tests to prevent side effects
- Mock at the appropriate level (module vs function vs method)

### Async Testing

- Always `await` async operations in tests
- Use `expect().rejects.toThrow()` for async error testing
- Handle promise resolution/rejection explicitly

### Test Data

- Use descriptive test data that makes test intent clear
- Avoid magic numbers and strings - use constants or descriptive variables
- Create minimal test fixtures that focus on the specific behavior being tested

## CI/CD Integration

### GitHub Actions

- Tests run on multiple Node.js versions (18+)
- Coverage reports generated in multiple formats (text, lcov, cobertura)
- JUnit XML output for test result reporting
- Fail builds on coverage threshold violations

### Pre-commit Hooks

- Type checking runs before tests
- Linting must pass before test execution
- Tests must pass before allowing commits
