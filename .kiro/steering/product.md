# Product Overview

EGIPCI MCP Server is a Model Context Protocol (MCP) server that provides AI assistants access to archaeological site information from Catalunya's EGIPCI service (Expedient d'Informació del Patrimoni Cultural Immoble).

## Purpose

- Enables AI editors like Claude Code and Cursor to query archaeological data
- Bridges the gap between AI tools and Catalunya's cultural heritage database
- Provides standardized MCP protocol access to EGIPCI archaeological information

## Package Distribution & Usage

This package is specifically designed as an **MCP server** and is **NOT intended for global installation** (`npm install -g`). Instead, it should be used through MCP client configuration:

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

This approach ensures:

- **Always latest version**: `npx` fetches the most recent release
- **No global pollution**: Doesn't install packages globally
- **Isolated execution**: Each MCP client runs its own instance
- **Easy updates**: Automatic version management

## Key Features

- Single tool: `query_egipci_site` for archaeological site queries
- Flexible authentication via environment variable or parameter
- XML response format as provided by EGIPCI service
- Comprehensive error handling for network, authentication, and validation issues

## Target Users

- AI assistant users researching archaeological sites in Catalunya
- Developers building cultural heritage applications
- Researchers working with Spanish archaeological data

## Authentication

Requires `.intranet` cookie from https://egipci.cultura.gencat.cat/ for access to the protected EGIPCI service.
