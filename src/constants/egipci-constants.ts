export const EGIPCI_CONFIG = {
  /** Base URL for the EGIPCI service */
  BASE_URL: 'https://egipci.cultura.gencat.cat/control.aspx',

  /** Content type for form data */
  CONTENT_TYPE: 'application/x-www-form-urlencoded',

  /** User agent for HTTP requests */
  USER_AGENT:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  // USER_AGENT: 'Mozilla/5.0 (compatible; EGIPCI-MCP-Server/1.0)',

  /** Cookie name for authentication */
  COOKIE_NAME: '.intranet',

  /** Form parameters */
  FORM_PARAMS: {
    METHOD: 'Form',
    OBJECT: 'ARQUEOLOGIC',
  },

  /** XML encoding for requests */
  XML_ENCODING: 'windows-1252',
} as const
