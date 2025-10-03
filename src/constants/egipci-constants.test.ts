import { describe, it, expect } from 'vitest'
import { EGIPCI_CONFIG } from './egipci-constants.js'

describe('EGIPCI_CONFIG', () => {
  it('should have correct base URL', () => {
    expect(EGIPCI_CONFIG.BASE_URL).toBe('https://egipci.cultura.gencat.cat/control.aspx')
  })

  it('should have correct content type', () => {
    expect(EGIPCI_CONFIG.CONTENT_TYPE).toBe('application/x-www-form-urlencoded')
  })

  it('should have a user agent string', () => {
    expect(EGIPCI_CONFIG.USER_AGENT).toBeTruthy()
    expect(typeof EGIPCI_CONFIG.USER_AGENT).toBe('string')
  })

  it('should have correct cookie name', () => {
    expect(EGIPCI_CONFIG.COOKIE_NAME).toBe('.intranet')
  })

  it('should have correct form parameters', () => {
    expect(EGIPCI_CONFIG.FORM_PARAMS.METHOD).toBe('Form')
    expect(EGIPCI_CONFIG.FORM_PARAMS.OBJECT).toBe('ARQUEOLOGIC')
  })

  it('should have correct XML encoding', () => {
    expect(EGIPCI_CONFIG.XML_ENCODING).toBe('windows-1252')
  })

  it('should be a const assertion object', () => {
    // Test that the object has the expected structure
    expect(typeof EGIPCI_CONFIG).toBe('object')
    expect(EGIPCI_CONFIG).toBeDefined()
  })
})
