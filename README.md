# EGIPCI MCP Server

MCP (Model Context Protocol) server for querying archaeological site information from the EGIPCI service (Expedient d'Informació del Patrimoni Cultural Immoble) of the Department of Culture of the Generalitat de Catalunya.

This server allows AI editors like Claude Code, Cursor, and other MCP clients to access archaeological information from Catalunya through the standard MCP protocol.

## Installation

```bash
npm install
npm run build
```

## Dependencies

This project uses the following key dependencies:

- **@modelcontextprotocol/sdk**: MCP protocol implementation
- **got**: HTTP client for making requests to EGIPCI service
- **zod**: Schema validation for input parameters

## Usage

### Starting the MCP Server

```bash
# Build and start the server
npm run build
npm start

# Or for development with hot reload
npm run dev
```

### MCP Client Configuration

To use this server with an MCP client, add the following configuration to your `mcp.json` file:

```json
{
  "mcpServers": {
    "gencat-egipci": {
      "command": "npx",
      "args": ["-y", "@d0whc3r/egipci-mcp@latest"],
      "env": {
        "EGIPCI_COOKIE": "your_intranet_cookie_value_here"
      }
    }
  }
}
```

### Available Tools

#### `query_egipci_site`

Query information for a specific archaeological site.

**Parameters:**

- `cookie` (string, optional): `.intranet` cookie for EGIPCI authentication. If not provided, the `EGIPCI_COOKIE` environment variable will be used
- `id` (string, required): Archaeological site ID to query

**Usage example:**

With cookie as parameter:

```json
{
  "name": "query_egipci_site",
  "arguments": {
    "cookie": "your_intranet_cookie_value",
    "id": "12345"
  }
}
```

With cookie from environment variable:

```json
{
  "name": "query_egipci_site",
  "arguments": {
    "id": "12345"
  }
}
```

**Response:**
Returns the site information in XML format as provided by the EGIPCI service.

### Authentication Methods

#### Using Environment Variable (Recommended)

The safest and most convenient way is to configure the cookie in the `EGIPCI_COOKIE` environment variable in the MCP configuration. This has several advantages:

- **Security**: The cookie is not exposed in each tool call
- **Convenience**: You don't need to pass the cookie in each query
- **Reusability**: Single configuration for all queries
- **Maintenance**: Easy update when the cookie expires

#### Using Cookie Parameter

You can also pass the cookie directly as a parameter in each call. This is useful for:

- Using different cookies for different queries
- Cases where you cannot configure environment variables
- Testing and development

### Obtaining Authentication Cookie

To obtain the required `.intranet` cookie:

1. Go to https://egipci.cultura.gencat.cat/ in your browser
2. Log in with your credentials
3. Open developer tools (F12)
4. Go to the "Application" or "Storage" tab
5. In "Cookies", look for the `.intranet` cookie
6. Copy the cookie value to use as parameter

### Error Handling

The server handles various types of errors using the `got` library:

- **Missing or invalid parameters**: Input validation with Zod
- **HTTP errors**: Status codes 4xx/5xx using `got.HTTPError`
- **Network errors**: Connectivity issues using `got.RequestError`
- **Authentication errors**: Invalid or expired cookie
- **Format errors**: XML response validation

All errors are returned with descriptive messages.

## Development

```bash
npm run dev          # Run with hot reload using tsx
npm run test         # Run tests with Vitest
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ci      # Run tests with CI reporters (JUnit, GitHub Actions)
npm run lint         # Run oxlint
npm run lint:fix     # Run oxlint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking (all projects)
npm run type-check:app # Type check application code only
npm run type-check:test # Type check test code only
npm run check-all    # Run all checks (type-check + lint + format:check + test)
npm run fix-all      # Fix all auto-fixable issues (lint:fix + format)
```

## Build

```bash
npm run build       # Compile TypeScript to JavaScript
npm run build:clean # Clean dist folder and rebuild
npm run clean       # Clean build artifacts and cache
```

## Code Quality

This project follows strict code quality standards with:

### Testing (Vitest)

- **Unit tests** for all modules with high coverage requirements
- **V8 coverage** provider for accurate coverage reporting
- **Mocking** for external dependencies and HTTP requests
- **Coverage thresholds** set to 80% for branches, functions, lines, and statements

### Linting (oxlint)

- **TypeScript** rules for type safety
- **Security** rules to prevent vulnerabilities
- **Promise** rules for proper async handling
- **Import/Export** rules for module organization
- **Unicorn** rules for modern JavaScript practices
- **Complexity** rules to maintain code readability

### Formatting (Prettier)

- Consistent code style across the project
- Automatic formatting on save and pre-commit

### Git Hooks (Husky + lint-staged)

- Pre-commit hooks run linting, formatting, and tests
- Type checking before commits
- Automatic code fixes when possible

### CI/CD Pipeline

- **Optimized GitHub Actions** with intelligent parallelization
- **Reusable actions** for common setup tasks
- **Multi-job workflow** with quality gates
- **Semantic Release** for automated versioning and publishing
- **Automated NPM publishing** with proper scoped package name
- **Advanced test reporting** (JUnit, GitHub Actions, Coverage)
- **Security scanning** with CodeQL and dependency review
- **Performance monitoring** with bundle size analysis
- **Artifact management** with automatic cleanup

### TypeScript Configuration

- **Project References** with separate configurations for app and tests
- **tsconfig.base.json** - Shared base configuration
- **tsconfig.app.json** - Application-specific configuration
- **tsconfig.test.json** - Test-specific configuration with Vitest types
- **Incremental compilation** for faster builds

### Additional Tools

- **EditorConfig** for consistent editor settings
- **TypeScript** strict mode for type safety
- **Git ignore** patterns for clean repository

## Technical Stack

- **Runtime**: Node.js >= 18.0.0
- **Language**: TypeScript >= 5.0.0
- **HTTP Client**: Got v14 for reliable HTTP requests
- **Protocol**: MCP (Model Context Protocol) SDK
- **Validation**: Zod for schema validation
- **Build**: tsup for fast TypeScript compilation
- **Code Quality**: oxlint + Prettier + Husky

## Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0.0
- Valid .intranet cookie for EGIPCI authentication
