# EGIPCI MCP Server

MCP (Model Context Protocol) server for querying archaeological site information from the EGIPCI service (Expedient d'Informació del Patrimoni Cultural Immoble) of the Department of Culture of the Generalitat de Catalunya.

This server allows AI editors like Claude Code, Cursor, and other MCP clients to access archaeological information from Catalunya through the standard MCP protocol.

**Note**: This package is designed to be used as an MCP server through `npx`, not as a global installation.

## Quick Start

This package is designed as an MCP server - no installation needed! Just configure it in your MCP client.

## Usage

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

For contributors and developers working on this project:

- **Development Setup**: See [`.kiro/steering/tech.md`](.kiro/steering/tech.md) for technology stack and commands
- **Testing Guidelines**: See [`.kiro/steering/testing.md`](.kiro/steering/testing.md) for testing patterns and requirements
- **CI/CD Pipeline**: See [`.kiro/steering/pipeline.md`](.kiro/steering/pipeline.md) for deployment and quality gates
- **Project Structure**: See [`.kiro/steering/structure.md`](.kiro/steering/structure.md) for architecture details

## Requirements

- Valid `.intranet` cookie for EGIPCI authentication
- For development: Node.js >= 18.0.0, pnpm
