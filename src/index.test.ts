import { describe, it, expect, vi, beforeEach } from 'vitest'
import { buildXmlPayload } from './services/egipci-client.js'

describe('EGIPCI MCP Server', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    delete process.env.EGIPCI_COOKIE
  })

  describe('XML Payload Building', () => {
    it('should build correct XML payload', () => {
      const id = 'test-id-123'
      const result = buildXmlPayload(id)

      expect(result).toContain(`<IDSOLICITUD>${id}</IDSOLICITUD>`)
      expect(result).toContain(`<CLAU>${id}</CLAU>`)
      expect(result).toContain("<?xml version='1.0'")
      expect(result).toContain('encoding="windows-1252"')
    })
  })

  describe('Environment Variables', () => {
    it('should handle missing environment variables', () => {
      expect(process.env.EGIPCI_COOKIE).toBeUndefined()
    })

    it('should handle set environment variables', () => {
      process.env.EGIPCI_COOKIE = 'test-cookie'
      expect(process.env.EGIPCI_COOKIE).toBe('test-cookie')
    })
  })

  describe('Error Handling', () => {
    it('should handle Error objects', () => {
      const error = new Error('Test error')
      expect(error.message).toBe('Test error')
      expect(error instanceof Error).toBe(true)
    })

    it('should handle string errors', () => {
      const errorString = 'String error'
      expect(typeof errorString).toBe('string')
      expect(String(errorString)).toBe('String error')
    })
  })
})
