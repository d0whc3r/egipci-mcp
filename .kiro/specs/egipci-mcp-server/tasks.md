# Implementation Plan

- [x] 1. Set up project structure and dependencies
  - Create package.json with MCP server dependencies
  - Install required packages: @modelcontextprotocol/sdk, got, zod
  - Set up basic project structure with src directory
  - Configure TypeScript, build tools (tsup), and code quality tools (oxlint, prettier, husky)
  - _Requirements: 1.1, 1.2_

- [x] 2. Implement MCP server foundation
  - Create main server file that initializes MCP server
  - Set up server to listen for MCP protocol messages
  - Implement basic server lifecycle (start, stop, error handling)
  - _Requirements: 1.1, 1.2_

- [x] 3. Create EGIPCI query tool
- [x] 3.1 Define MCP tool schema for EGIPCI queries
  - Define tool with name, description, and input schema
  - Specify required parameters: cookie and id
  - Set up parameter validation
  - _Requirements: 1.1, 1.4_

- [x] 3.2 Implement HTTP client for EGIPCI API using Got
  - Create function to build XML payload with IDSOLICITUD and CLAU
  - Implement POST request using Got library to https://egipci.cultura.gencat.cat/control.aspx
  - Set up proper headers including cookie authentication and User-Agent
  - Handle form data encoding with URLSearchParams
  - Implement Got-specific error handling (HTTPError, RequestError)
  - _Requirements: 1.2, 1.3, 1.4_

- [x] 3.3 Implement tool execution handler with environment variable support
  - Create handler function that processes MCP tool calls
  - Validate input parameters (id required, cookie optional) using Zod schemas
  - Implement cookie resolution: parameter takes priority over EGIPCI_COOKIE env var
  - Add validation to ensure at least one cookie source is available
  - Call HTTP client and return XML response
  - Handle Got-specific errors and return appropriate error messages
  - Add basic XML format validation
  - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.4_

- [ ]\* 3.4 Add unit tests for tool functionality
  - Test XML payload construction
  - Test parameter validation with Zod
  - Test Got error handling scenarios (HTTPError, RequestError)
  - Test XML format validation
  - _Requirements: 1.1, 2.2, 2.4_

- [ ] 4. Integrate and finalize server
- [x] 4.1 Register tool with MCP server
  - Connect the EGIPCI tool to the MCP server
  - Ensure tool is properly exposed via MCP protocol
  - _Requirements: 1.1, 1.2_

- [x] 4.2 Add server configuration and startup script
  - Create executable script to start the MCP server
  - Add proper error handling for server startup
  - Include usage instructions in README with Got-specific details
  - Configure build and development scripts with tsup and tsx
  - _Requirements: 1.1, 1.2_

- [x] 4.3 Add environment variable configuration support
  - Update MCP client configuration examples in README
  - Document both cookie parameter and EGIPCI_COOKIE environment variable options
  - Add authentication methods section explaining advantages of each approach
  - Update tool schema to make cookie parameter optional
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]\* 4.3 Add integration tests
  - Test complete MCP server functionality
  - Test actual API calls to EGIPCI service (with test data)
  - _Requirements: 2.1, 2.2, 2.3, 2.4_
