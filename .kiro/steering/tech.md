# Technology Stack

## Runtime & Language

- **Node.js**: >= 18.0.0 (ES modules, modern JavaScript features)
- **TypeScript**: >= 5.0.0 with strict mode enabled
- **Module System**: ES modules (`"type": "module"` in package.json)

## Core Dependencies

- **@modelcontextprotocol/sdk**: MCP protocol implementation
- **got**: HTTP client for reliable requests to EGIPCI service
- **zod**: Runtime schema validation for input parameters

## Build System

- **tsup**: Fast TypeScript bundler with ESM output
- **Target**: Node.js 18+ with ESM format
- **Bundle**: Single file output with external dependencies
- **Source maps**: Enabled in development, disabled in production

## Code Quality Tools

- **oxlint**: Fast linter with TypeScript, import, promise, and unicorn rules
- **Prettier**: Code formatter (single quotes, no semicolons, 120 char width)
- **Husky + lint-staged**: Pre-commit hooks for quality gates
- **EditorConfig**: Consistent editor settings (2-space indentation, LF line endings)

## Testing Framework

- **Vitest**: Fast test runner with V8 coverage
- **Coverage thresholds**: 80% for branches, functions, lines, statements
- **Test setup**: Global test environment with Node.js context
- **CI reporting**: JUnit XML, GitHub Actions, and coverage reports

## TypeScript Configuration

- **Project references**: Separate configs for app (`tsconfig.app.json`) and tests (`tsconfig.test.json`)
- **Base config**: Shared settings in `tsconfig.base.json`
- **Incremental compilation**: Enabled for faster builds

## Package Management

- **pnpm**: Workspace-enabled package manager
- **Lock file**: `pnpm-lock.yaml` for reproducible installs
- **Workspace**: Configured via `pnpm-workspace.yaml`

## Essential Commands

### Development

```bash
pnpm dev          # Hot reload development server
pnpm build        # Production build
pnpm start        # Run built server
```

### Quality Checks

```bash
pnpm lint         # Run oxlint
pnpm lint:fix     # Auto-fix linting issues
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm type-check   # TypeScript type checking
```

### Testing

```bash
pnpm test         # Run tests once
pnpm test:watch   # Watch mode testing
pnpm test:coverage # Coverage report
pnpm test:ci      # CI testing with reports
```

### Maintenance

```bash
pnpm clean        # Clean build artifacts
```

## CI/CD Pipeline

- **GitHub Actions**: Automated testing, building, and publishing
- **Semantic Release**: Automated versioning and changelog generation
- **NPM Publishing**: Scoped package (`@d0whc3r/egipci-mcp`) via pnpm for MCP usage
- **Security**: CodeQL analysis and dependency review

## Package Distribution Strategy

This package is distributed as an **MCP server** via NPM, designed to be executed through `npx` rather than global installation:

- **Distribution**: NPM registry as `@d0whc3r/egipci-mcp`
- **Execution**: Via `npx -y @d0whc3r/egipci-mcp@latest` in MCP configurations
- **Versioning**: Semantic versioning with automatic latest version fetching
- **No Global Install**: Not intended for `npm install -g` usage
