# Project Structure

## Root Directory Organization

```
├── src/                    # Source code
├── dist/                   # Built output (generated)
├── coverage/               # Test coverage reports (generated)
├── test-results/           # Test output files (generated)
├── node_modules/           # Dependencies (generated)
├── .github/                # GitHub workflows and templates
├── .husky/                 # Git hooks configuration
├── .kiro/                  # Kiro IDE configuration and steering
└── docs/                   # Documentation (empty, reserved)
```

## Source Code Structure (`src/`)

```
src/
├── index.ts                # Main entry point and MCP server setup
├── test-setup.ts           # Global test configuration
├── constants/              # Application constants
│   ├── egipci-constants.ts # EGIPCI service configuration
│   └── *.test.ts          # Unit tests for constants
└── services/               # Business logic services
    ├── egipci-client.ts    # HTTP client for EGIPCI API
    └── *.test.ts          # Unit tests for services
```

## Architecture Patterns

### Layered Architecture

- **Entry Point** (`index.ts`): MCP server configuration and tool registration
- **Services** (`services/`): Business logic and external API integration
- **Constants** (`constants/`): Configuration and static values
- **Tests**: Co-located with source files using `*.test.ts` pattern

### File Naming Conventions

- **Source files**: `kebab-case.ts` (e.g., `egipci-client.ts`)
- **Test files**: `kebab-case.test.ts` (e.g., `egipci-client.test.ts`)
- **Constants**: `kebab-case-constants.ts` pattern
- **Configuration**: `kebab-case.config.ts` or `.configrc` formats

### Import/Export Patterns

- **ES modules**: Use `.js` extensions in imports (TypeScript requirement)
- **Named exports**: Prefer named exports over default exports
- **Barrel exports**: Not used (simple project structure)
- **Relative imports**: Use relative paths within project, absolute for external packages

## Configuration Files

### TypeScript Configuration

- `tsconfig.json`: Project references root
- `tsconfig.base.json`: Shared base configuration
- `tsconfig.app.json`: Application-specific settings
- `tsconfig.test.json`: Test-specific settings with Vitest types

### Build and Quality

- `tsup.config.ts`: Build configuration
- `vitest.config.ts`: Test runner configuration
- `.oxlintrc.json`: Linting rules and overrides
- `.prettierrc`: Code formatting rules
- `.editorconfig`: Editor consistency settings

### Package Management

- `package.json`: Main package configuration with comprehensive scripts
- `pnpm-lock.yaml`: Dependency lock file
- `pnpm-workspace.yaml`: Workspace configuration
- `.npmrc`: NPM registry configuration

### Git and CI

- `.gitignore`: Standard Node.js ignore patterns
- `.github/`: Workflows, issue templates, and repository documentation
- `.husky/`: Git hooks for pre-commit and pre-push quality gates
- `.releaserc.json`: Semantic release configuration

## Code Organization Principles

### Single Responsibility

- Each module has a focused purpose (HTTP client, constants, server setup)
- Clear separation between MCP server logic and EGIPCI API integration
- Test files co-located with source for easy maintenance

### Dependency Direction

- `index.ts` depends on `services/` and `constants/`
- `services/` depends on `constants/` but not on each other
- No circular dependencies between modules

### Error Handling Strategy

- Service layer throws typed errors (HTTPError, RequestError, ValidationError)
- Entry point catches and formats errors for MCP protocol
- Comprehensive error messages with context

### Testing Strategy

- Unit tests for all modules with 80% coverage requirement
- Mocking of external dependencies (HTTP requests)
- Test setup file for global configuration
- Separate test TypeScript configuration
