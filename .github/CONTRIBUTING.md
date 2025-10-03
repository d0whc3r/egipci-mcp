# Contributing to EGIPCI MCP Server

Thank you for your interest in contributing to the EGIPCI MCP Server! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/egipci-mcp.git`
3. **Install** dependencies: `pnpm install`
4. **Create** a branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes
6. **Test** your changes: `pnpm run type-check && pnpm run lint && pnpm run test`
7. **Commit** your changes: `git commit -m "feat: add amazing feature"`
8. **Push** to your branch: `git push origin feature/amazing-feature`
9. **Open** a Pull Request

## 📋 Development Setup

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 10.0.0 (recommended) or npm
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/d0whc3r/egipci-mcp.git
cd egipci-mcp

# Install dependencies
pnpm install

# Verify setup
pnpm run type-check && pnpm run lint && pnpm run test
```

### Development Scripts

```bash
# Development
pnpm run dev              # Run with hot reload
pnpm run build            # Build for production
pnpm run start            # Start built application

# Testing
pnpm run test             # Run tests
pnpm run test:watch       # Run tests in watch mode
pnpm run test:coverage    # Run tests with coverage

# Code Quality
pnpm run lint             # Run linter
pnpm run lint:fix         # Fix linting issues
pnpm run format           # Format code
pnpm run format:check     # Check formatting
pnpm run type-check       # TypeScript type checking

# Quality checks
pnpm run type-check       # TypeScript type checking
pnpm run lint             # Run linter
pnpm run lint:fix         # Fix linting issues
pnpm run format           # Format code
pnpm run format:check     # Check formatting
```

## 🎯 How to Contribute

### Reporting Bugs

1. **Search** existing issues to avoid duplicates
2. **Use** the bug report template
3. **Provide** detailed information:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Error logs (sanitized)

### Suggesting Features

1. **Search** existing feature requests
2. **Use** the feature request template
3. **Explain** the problem and proposed solution
4. **Provide** use cases and examples

### Submitting Code Changes

1. **Follow** the development setup
2. **Create** a feature branch from `develop`
3. **Make** your changes following our guidelines
4. **Write** or update tests
5. **Update** documentation
6. **Submit** a pull request

## 📝 Coding Standards

### Code Style

We use automated tools to maintain code quality:

- **ESLint** with oxlint for fast linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for git hooks

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `perf`: Performance improvements

**Examples:**

```bash
feat: add support for multiple EGIPCI cookies
fix: handle network timeout errors gracefully
docs: update installation instructions
test: add unit tests for egipci client
```

### TypeScript Guidelines

- Use **strict mode** TypeScript
- Provide **explicit types** for public APIs
- Use **interfaces** for object shapes
- Prefer **type guards** for runtime type checking
- Document **complex types** with JSDoc

### Testing Guidelines

- Write **unit tests** for all new functionality
- Maintain **80%+ coverage** (enforced by CI)
- Use **descriptive test names**
- Mock **external dependencies**
- Test **error conditions** and edge cases

Example test structure:

```typescript
describe('EgipciClient', () => {
  describe('querySite', () => {
    it('should return site data for valid ID', async () => {
      // Test implementation
    })

    it('should throw error for invalid ID', async () => {
      // Test implementation
    })
  })
})
```

## 🏗️ Project Structure

```
egipci-mcp/
├── src/                    # Source code
│   ├── constants/          # Constants and configuration
│   ├── services/           # Business logic services
│   └── index.ts           # Main entry point
├── docs/                   # Documentation
├── .github/               # GitHub configuration
│   ├── workflows/         # CI/CD workflows
│   ├── ISSUE_TEMPLATE/    # Issue templates
│   └── actions/           # Reusable actions
├── tests/                 # Test files (if separate)
└── dist/                  # Built output
```

### Key Files

- `src/index.ts` - MCP server entry point
- `src/services/egipci-client.ts` - EGIPCI API client
- `src/constants/` - Configuration and constants
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.github/workflows/` - CI/CD pipelines

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch

# Run CI tests (with all reporters)
pnpm run test:ci
```

### Test Requirements

- **Unit tests** for all new functions/classes
- **Integration tests** for MCP server functionality
- **Mock** external API calls
- **Test** both success and error scenarios
- **Maintain** or improve coverage percentage

### Test Environment

Tests use:

- **Vitest** as test runner
- **V8** for coverage
- **MSW** for API mocking (if needed)
- **@testing-library** for component testing (if applicable)

## 📚 Documentation

### What to Document

- **Public APIs** and their parameters
- **Configuration options** and examples
- **Error conditions** and handling
- **Breaking changes** and migration guides
- **Complex algorithms** or business logic

### Documentation Standards

- Use **JSDoc** for code documentation
- Update **README.md** for user-facing changes
- Add **examples** for new features
- Include **troubleshooting** information
- Keep documentation **up to date**

## 🔒 Security

### Security Guidelines

- **Never** commit secrets or credentials
- **Sanitize** user inputs
- **Validate** all external data
- **Use** environment variables for configuration
- **Follow** OWASP security practices

### Reporting Security Issues

- **Do not** create public issues for security vulnerabilities
- **Use** GitHub's security advisory feature
- **Email** maintainers for critical issues
- **Provide** detailed reproduction steps

## 🚀 Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Release Workflow

1. **Merge** to `master` triggers release
2. **Semantic Release** analyzes commits
3. **Automatic** version bump and changelog
4. **Publish** to npm registry
5. **Create** GitHub release

## 🤝 Community

### Code of Conduct

- Be **respectful** and inclusive
- **Help** others learn and grow
- **Provide** constructive feedback
- **Follow** project guidelines
- **Report** inappropriate behavior

### Getting Help

- **Read** the documentation first
- **Search** existing issues and discussions
- **Ask** questions in GitHub Discussions
- **Join** community conversations
- **Be** patient and respectful

### Recognition

Contributors are recognized through:

- **GitHub** contributor graphs
- **Changelog** mentions
- **Release** notes
- **Community** acknowledgments

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/d0whc3r/egipci-mcp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/d0whc3r/egipci-mcp/discussions)
- **Security**: [Security Advisories](https://github.com/d0whc3r/egipci-mcp/security/advisories)
- **Maintainer**: [@d0whc3r](https://github.com/d0whc3r)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to EGIPCI MCP Server! 🎉
