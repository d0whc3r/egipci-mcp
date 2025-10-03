#!/usr/bin/env node
// oxlint-disable no-console

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z, ZodError } from 'zod'
import { queryEgipciSite } from './services/egipci-client.js'

/**
 * Create and configure the EGIPCI MCP Server
 */
function createEgipciServer(): McpServer {
  const server = new McpServer({
    name: 'egipci-mcp-server',
    version: '1.0.0',
  })

  // Register the EGIPCI query tool
  server.registerTool(
    'query_egipci_site',
    {
      title: 'Query EGIPCI for an archaeological site info',
      description: 'Query archaeological site information from the EGIPCI service of the Generalitat de Catalunya',
      inputSchema: {
        cookie: z
          .string()
          .min(1)
          .optional()
          .describe('The .intranet cookie for EGIPCI authentication (optional if EGIPCI_COOKIE env var is set)'),
        id: z.string().min(1).describe('The archaeological site ID to query'),
      },
    },
    async ({ cookie, id }) => {
      try {
        // Use provided cookie or fallback to environment variable
        const authCookie = cookie || process.env.EGIPCI_COOKIE

        if (!authCookie) {
          throw new Error(
            'No authentication cookie provided. Either pass the cookie parameter or set the EGIPCI_COOKIE environment variable.',
          )
        }

        const xmlResponse = await queryEgipciSite({ cookie: authCookie, id })

        return {
          content: [
            {
              type: 'text',
              text: xmlResponse,
            },
          ],
        }
      } catch (error) {
        // Handle validation and query errors
        let errorMessage: string

        if (error instanceof ZodError) {
          // Format Zod validation errors nicely
          const issues = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
          errorMessage = `Validation error: ${issues}`
        } else {
          errorMessage = error instanceof Error ? error.message : String(error)
        }

        return {
          content: [
            {
              type: 'text',
              text: `Query error: ${errorMessage}`,
            },
          ],
          isError: true,
        }
      }
    },
  )

  return server
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  const server = createEgipciServer()
  const transport = new StdioServerTransport()

  // Handle graceful shutdown
  const shutdown = async (signal: string) => {
    console.error(`[Server] Received ${signal}, shutting down gracefully...`)
    try {
      await server.close()
      process.exit(0)
    } catch (error) {
      console.error('[Server] Error during shutdown:', error)
      process.exit(1)
    }
  }

  // Register signal handlers for graceful shutdown
  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('[Server] Uncaught exception:', error)
    process.exit(1)
  })

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('[Server] Unhandled rejection at:', promise, 'reason:', reason)
    process.exit(1)
  })

  try {
    console.error('[Server] Starting EGIPCI MCP Server...')
    await server.connect(transport)
    console.error('[Server] EGIPCI MCP Server started successfully')
  } catch (error) {
    console.error('[Server] Failed to start server:', error)
    process.exit(1)
  }
}

// Start the server - always run when this module is executed
// This is designed to be the main entry point for the MCP server
// oxlint-disable-next-line prefer-await-to-then,prefer-await-to-callbacks
main().catch((error) => {
  console.error('[Server] Fatal error:', error)
  process.exit(1)
})
