# Design Document

## Overview

The EGIPCI MCP server is a Node.js application that implements the MCP protocol to be used with AI editors like Claude Code, Cursor, etc. The server exposes MCP tools that allow querying archaeological site information from the EGIPCI service (Expedient d'Informació del Patrimoni Cultural Immoble) of the Department of Culture of the Generalitat de Catalunya. It accepts an authentication cookie and a site ID, performs an HTTP POST request to the service, and returns the XML response.

## Architecture

```
AI Editor (Claude Code, etc.) → MCP Server → EGIPCI API
                                     ↓
                                XML Response
```

The MCP server acts as a bridge between AI editors and the EGIPCI API, providing access to archaeological information through the standard MCP protocol.

## Components and Interfaces

### MCP Server

- **Responsibility**: Implement the standard MCP protocol
- **Input**: MCP messages from client
- **Output**: MCP responses according to protocol

### EGIPCI Tool

- **Responsibility**: Perform queries to the EGIPCI service
- **Input parameters**:
  - `cookie`: String - ".intranet" cookie for authentication
  - `id`: String/Number - Archaeological site ID
- **Output**: XML response from EGIPCI service

### HTTP Client (Got)

- **Responsibility**: Perform HTTP requests to the EGIPCI endpoint using the Got library
- **Configuration**:
  - URL: `https://egipci.cultura.gencat.cat/control.aspx`
  - Method: POST
  - Headers: Cookie ".intranet", Content-Type, User-Agent
  - Body: Form data with XML payload
- **Got Advantages**:
  - Robust error handling with specific types (HTTPError, RequestError)
  - Native TypeScript support
  - Better performance than native fetch

## Data Models

### Request Payload

```xml
<?xml version='1.0' encoding="windows-1252" ?>
<XML>
  <IDSOLICITUD>{id}</IDSOLICITUD>
  <CLAU>{id}</CLAU>
</XML>
```

### HTTP Request Structure (Got)

```javascript
await got.post('https://egipci.cultura.gencat.cat/control.aspx', {
  headers: {
    Cookie: '.intranet={cookie_value}',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (compatible; EGIPCI-MCP-Server)',
  },
  body: formData.toString(), // URLSearchParams with metode, objecte, parametres
})
```

### MCP Tool Definition

```javascript
{
  name: 'query_egipci_site',
  description: 'Query archaeological site information from the EGIPCI service',
  inputSchema: {
    type: 'object',
    properties: {
      cookie: {
        type: 'string',
        description: '.intranet cookie for authentication (optional if EGIPCI_COOKIE is configured)',
        optional: true
      },
      id: {
        type: 'string',
        description: 'Archaeological site ID'
      }
    },
    required: ['id']
  }
}
```

### Environment Variable Support

- **Variable**: `EGIPCI_COOKIE`
- **Purpose**: Store authentication cookie securely
- **Priority**: Cookie parameter takes priority over environment variable
- **Validation**: Verify that at least one cookie source is available

## Error Handling

### Error Types

1. **Missing parameters**: Validation with Zod schema
2. **Network errors**: `got.RequestError` - timeout, connection refused, DNS
3. **HTTP errors**: `got.HTTPError` - status codes 4xx, 5xx
4. **Authentication errors**: Invalid or expired cookie
5. **Format errors**: Response is not valid XML

### Handling Strategy

- Parameter validation with Zod before making the request
- Specific Got error handling (HTTPError vs RequestError)
- Configured timeout to avoid hanging requests
- Descriptive error messages for the user
- Basic XML format validation in the response

## Testing Strategy

### Unit Tests

- Input parameter validation
- Correct XML payload construction
- Handling of different error types

### Integration Tests

- Complete request to EGIPCI service (with test data)
- Response format verification
- Tests with valid and invalid cookies
