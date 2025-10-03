import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { HTTPError, RequestError } from 'got'
import { buildXmlPayload, queryEgipciSite } from './egipci-client.js'
import { EGIPCI_CONFIG } from '../constants/egipci-constants.js'

// Mock got
vi.mock('got', async (importOriginal) => {
  const actual = await importOriginal<typeof import('got')>()
  return {
    default: {
      post: vi.fn(),
      HTTPError: actual.HTTPError,
      RequestError: actual.RequestError,
    },
    HTTPError: actual.HTTPError,
    RequestError: actual.RequestError,
  }
})

describe('egipci-client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('buildXmlPayload', () => {
    it('should build correct XML payload', () => {
      const id = 'test-id-123'
      const result = buildXmlPayload(id)

      expect(result).toBe(
        `<?xml version='1.0' encoding="${EGIPCI_CONFIG.XML_ENCODING}" ?><XML><IDSOLICITUD>${id}</IDSOLICITUD><CLAU>${id}</CLAU></XML>`,
      )
    })

    it('should handle special characters in ID', () => {
      const id = 'test-id-with-&-special-chars'
      const result = buildXmlPayload(id)

      expect(result).toContain(`<IDSOLICITUD>${id}</IDSOLICITUD>`)
      expect(result).toContain(`<CLAU>${id}</CLAU>`)
    })

    it('should use correct XML encoding', () => {
      const result = buildXmlPayload('test')
      expect(result).toContain(`encoding="${EGIPCI_CONFIG.XML_ENCODING}"`)
    })
  })

  describe('queryEgipciSite', () => {
    const mockParams = {
      cookie: 'test-cookie-value',
      id: 'test-site-id',
    }

    it('should make correct HTTP request', async () => {
      const mockResponse = {
        body: '<?xml version="1.0"?><response>test</response>',
      }

      const { default: got } = await import('got')
      const mockPost = vi.mocked(got.post)
      mockPost.mockResolvedValueOnce(mockResponse)

      await queryEgipciSite(mockParams)

      expect(mockPost).toHaveBeenCalledWith(
        EGIPCI_CONFIG.BASE_URL,
        expect.objectContaining({
          headers: {
            Cookie: `${EGIPCI_CONFIG.COOKIE_NAME}=${mockParams.cookie}`,
            'Content-Type': EGIPCI_CONFIG.CONTENT_TYPE,
            'User-Agent': EGIPCI_CONFIG.USER_AGENT,
          },
          body: expect.stringContaining('metode=Form'),
        }),
      )
    })

    it('should return XML response', async () => {
      const mockXmlResponse = '<?xml version="1.0"?><response>archaeological data</response>'
      const mockResponse = { body: mockXmlResponse }

      const { default: got } = await import('got')
      const mockPost = vi.mocked(got.post)
      mockPost.mockResolvedValueOnce(mockResponse)

      const result = await queryEgipciSite(mockParams)

      expect(result).toBe(mockXmlResponse)
    })

    it('should handle XML without declaration', async () => {
      const mockXmlResponse = '<response>archaeological data</response>'
      const mockResponse = { body: mockXmlResponse }

      const { default: got } = await import('got')
      const mockPost = vi.mocked(got.post)
      mockPost.mockResolvedValueOnce(mockResponse)

      const result = await queryEgipciSite(mockParams)

      expect(result).toBe(mockXmlResponse)
    })

    it('should throw error for non-XML response', async () => {
      const mockResponse = { body: 'Not XML content' }

      const { default: got } = await import('got')
      const mockPost = vi.mocked(got.post)
      mockPost.mockResolvedValueOnce(mockResponse)

      await expect(queryEgipciSite(mockParams)).rejects.toThrow('Response does not appear to be valid XML')
    })

    it('should handle HTTP errors', async () => {
      const httpError = {
        name: 'HTTPError',
        response: {
          statusCode: 404,
          statusMessage: 'Not Found',
        },
      }
      Object.setPrototypeOf(httpError, HTTPError.prototype)

      const { default: got } = await import('got')
      const mockPost = vi.mocked(got.post)
      mockPost.mockRejectedValueOnce(httpError)

      await expect(queryEgipciSite(mockParams)).rejects.toThrow('HTTP Error 404: Not Found')
    })

    it('should handle network errors', async () => {
      const requestError = new RequestError('Network error', {} as any, {} as any)

      const { default: got } = await import('got')
      const mockPost = vi.mocked(got.post)
      mockPost.mockRejectedValueOnce(requestError)

      await expect(queryEgipciSite(mockParams)).rejects.toThrow('Network error: Could not connect to EGIPCI service')
    })

    it('should handle unknown errors', async () => {
      const unknownError = 'Unknown error'

      const { default: got } = await import('got')
      const mockPost = vi.mocked(got.post)
      mockPost.mockRejectedValueOnce(unknownError)

      await expect(queryEgipciSite(mockParams)).rejects.toThrow('Unknown error querying service: Unknown error')
    })

    it('should include correct form data', async () => {
      const mockResponse = { body: '<?xml version="1.0"?><response>test</response>' }

      const { default: got } = await import('got')
      const mockPost = vi.mocked(got.post)
      mockPost.mockResolvedValueOnce(mockResponse)

      await queryEgipciSite(mockParams)

      const callArgs = mockPost.mock.calls[0]
      const options = callArgs[1] as any
      const body = options?.body as string

      expect(body).toContain('metode=Form')
      expect(body).toContain('objecte=ARQUEOLOGIC')
      expect(body).toContain('parametres=')
      expect(body).toContain(mockParams.id) // Check that the ID is in the body
    })
  })
})
