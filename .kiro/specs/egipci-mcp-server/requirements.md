# Requirements Document

## Introduction

This project consists of developing a simple MCP (Model Context Protocol) server in Node.js that allows querying archaeological site information from the EGIPCI service (Expedient d'Informació del Patrimoni Cultural Immoble) of the Department of Culture of the Generalitat de Catalunya. The server will receive a cookie and an ID as input parameters and perform a fetch to obtain the information in XML format.

## Requirements

### Requirement 1

**User Story:** As a user, I want an MCP server that takes a cookie (optional) and an ID as input, to obtain XML information from archaeological sites from the EGIPCI service.

#### Acceptance Criteria

1. WHEN the MCP tool is called THEN SHALL receive one required parameter (site ID) and one optional parameter (cookie)
2. WHEN no cookie is provided as parameter THEN SHALL use the EGIPCI_COOKIE environment variable
3. WHEN no cookie is available (neither parameter nor environment variable) THEN SHALL return descriptive error
4. WHEN the query is executed THEN SHALL make a POST to https://egipci.cultura.gencat.cat/control.aspx
5. WHEN the request is sent THEN SHALL include the ".intranet" cookie in the headers
6. WHEN the payload is built THEN SHALL use the specified XML format with IDSOLICITUD and CLAU equal to the provided ID

### Requirement 2

**User Story:** As a system administrator, I want to configure the authentication cookie once in the MCP configuration, so I don't have to provide it in each query.

#### Acceptance Criteria

1. WHEN EGIPCI_COOKIE is configured in the MCP server environment variables THEN SHALL use that cookie automatically
2. WHEN both cookie parameter and environment variable are provided THEN SHALL prioritize the parameter
3. WHEN the environment variable is configured THEN SHALL allow omitting the cookie parameter in calls
4. WHEN the environment variable is updated THEN SHALL use the new cookie in subsequent queries

### Requirement 3

**User Story:** As a user, I want to receive the XML response directly, so I can process it according to my needs.

#### Acceptance Criteria

1. WHEN a response is received from the service THEN SHALL return the XML as provided by the API
2. WHEN an error occurs in the request THEN SHALL return a descriptive error message
3. WHEN the request is successful THEN SHALL return the complete XML content
4. IF there are connectivity issues THEN SHALL handle the error appropriately
