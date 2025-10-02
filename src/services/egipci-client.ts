import { EGIPCI_CONFIG } from '../constants/egipci-constants.js'
import got, { HTTPError, RequestError } from 'got'

/**
 * HTTP client for interacting with the EGIPCI service
 */

export function buildXmlPayload(id: string): string {
  return `<?xml version='1.0' encoding="${EGIPCI_CONFIG.XML_ENCODING}" ?><XML><IDSOLICITUD>${id}</IDSOLICITUD><CLAU>${id}</CLAU></XML>`
}

export async function queryEgipciSite(params: { cookie: string; id: string }): Promise<string> {
  const { cookie, id } = params

  // Build the XML payload
  const xmlPayload = buildXmlPayload(id)

  // Prepare the form data
  const formData = new URLSearchParams()
  formData.append('metode', EGIPCI_CONFIG.FORM_PARAMS.METHOD)
  formData.append('objecte', EGIPCI_CONFIG.FORM_PARAMS.OBJECT)
  formData.append('parametres', xmlPayload)

  try {
    // Make the HTTP request
    const response = await got.post(EGIPCI_CONFIG.BASE_URL, {
      headers: {
        Cookie: `${EGIPCI_CONFIG.COOKIE_NAME}=${cookie}`,
        'Content-Type': EGIPCI_CONFIG.CONTENT_TYPE,
        'User-Agent': EGIPCI_CONFIG.USER_AGENT,
      },
      body: formData.toString(),
    })

    // Get the response text (XML)
    const xmlResponse = response.body

    // Basic validation that we received XML content
    if (!xmlResponse.trim().startsWith('<?xml') && !xmlResponse.trim().startsWith('<')) {
      throw new Error('Response does not appear to be valid XML')
    }

    return xmlResponse
  } catch (error) {
    // Handle different types of errors
    if (error instanceof HTTPError) {
      throw new TypeError(`HTTP Error ${error.response.statusCode}: ${error.response.statusMessage}`)
    } else if (error instanceof RequestError) {
      throw new TypeError('Network error: Could not connect to EGIPCI service')
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error(`Unknown error querying service: ${String(error)}`)
  }
}
