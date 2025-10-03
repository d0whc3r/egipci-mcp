---
inclusion: fileMatch
fileMatchPattern: ['.github/workflows/*.yml', '.github/workflows/*.yaml', 'package.json', '.releaserc.json']
---

# CI/CD Pipeline Guidelines

## Quality Gates (Required Before Release)

All checks must pass for successful deployment:

- **Linting**: `pnpm lint` - oxlint with TypeScript, import, promise, unicorn rules
- **Formatting**: `pnpm format:check` - Prettier (single quotes, no semicolons)
- **Type Checking**: `pnpm type-check` - TypeScript strict mode
- **Testing**: `pnpm test:ci` - Vitest with 80% coverage threshold
- **Build**: `pnpm build` - tsup ESM compilation for Node.js 18+

## Commit Conventions (Semantic Release)

Use conventional commits for automated versioning:

```
feat: new feature → minor version (1.0.0 → 1.1.0)
fix: bug fix → patch version (1.0.0 → 1.0.1)
perf: performance improvement → patch version
BREAKING CHANGE: → major version (1.0.0 → 2.0.0)
docs/style/test/build/ci/chore: → no release
```

## Branch Strategy

- `master`: Production releases (1.0.0, 1.1.0, 2.0.0)
- `develop`: Beta releases (1.1.0-beta.1, 2.0.0-beta.1)
- Feature branches: Create from `develop`, merge via PR

## Performance Requirements

- **Bundle Size**: < 10KB (CLI tool constraint)
- **Startup Time**: < 1000ms average
- **Dependencies**: Minimize production dependencies
- **Coverage**: 80% minimum (branches, functions, lines, statements)

## Workflow Files

- `.github/workflows/ci.yml`: Main pipeline with quality gates and releases
- `.github/workflows/security.yml`: Security audits and vulnerability scanning
- Package publishing to `@d0whc3r/egipci-mcp` on NPM for MCP server usage

## MCP Distribution Strategy

This package is specifically built for MCP (Model Context Protocol) usage:

- **Target Usage**: MCP client configuration with `npx` execution
- **Not Global**: Never intended for `npm install -g` or global installation
- **Version Strategy**: Always use `@latest` tag for automatic updates
- **Execution Pattern**: `npx -y @d0whc3r/egipci-mcp@latest` in MCP configurations

## Environment Requirements

- **Node.js**: Version 22 (LTS)
- **Package Manager**: pnpm v10
- **Module System**: ES modules with `.js` imports in TypeScript
- **Lock File**: `pnpm-lock.yaml` (frozen in CI)

## Security Practices

- Never hardcode secrets - use GitHub secrets
- Run `pnpm audit` before releases
- Dependency scanning on schedule (weekly)
- CodeQL analysis for security vulnerabilities

## Release Process

1. Quality gates pass
2. Semantic release determines version
3. Auto-generated changelog from commits
4. NPM package publication
5. GitHub release with compiled binary
6. Git tag creation
