# Security Policy

## Supported Versions

We actively support the following versions of EGIPCI MCP Server with security updates:

| Version | Supported |
| ------- | --------- |
| 1.x.x   | ✅ Yes    |
| < 1.0   | ❌ No     |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 🔒 Private Reporting (Preferred)

1. **Use GitHub Security Advisories**: Go to [Security Advisories](https://github.com/d0whc3r/egipci-mcp/security/advisories/new) and create a new advisory
2. **Provide detailed information** about the vulnerability
3. **Include steps to reproduce** if possible
4. **Suggest a fix** if you have one

### 📧 Email Reporting

If you cannot use GitHub Security Advisories, you can email security issues to:

- **Email**: [Create an issue](https://github.com/d0whc3r/egipci-mcp/issues/new?template=security_report.yml) and mark it as security-related

### ⚠️ What NOT to do

- **Do not** create public issues for security vulnerabilities
- **Do not** discuss security issues in public forums
- **Do not** share exploit code publicly before the issue is resolved

## Security Response Process

### Timeline

- **Initial Response**: Within 48 hours of report
- **Confirmation**: Within 1 week of report
- **Fix Development**: Depends on severity and complexity
- **Release**: As soon as fix is ready and tested
- **Public Disclosure**: After fix is released

### Severity Levels

#### 🔴 Critical

- Remote code execution
- Authentication bypass
- Data exposure of sensitive information
- **Response Time**: Within 24 hours

#### 🟠 High

- Privilege escalation
- SQL injection or similar injection attacks
- Cross-site scripting (XSS)
- **Response Time**: Within 48 hours

#### 🟡 Medium

- Information disclosure
- Denial of service
- **Response Time**: Within 1 week

#### 🟢 Low

- Minor information leaks
- Non-exploitable bugs
- **Response Time**: Within 2 weeks

## Security Best Practices

### For Users

#### 🔐 Cookie Security

- **Never share** your `.intranet` cookie publicly
- **Use environment variables** for cookie storage
- **Rotate cookies** regularly
- **Monitor** cookie expiration

#### 🛡️ Configuration Security

```json
{
  "mcpServers": {
    "gencat-egipci": {
      "command": "egipci-mcp",
      "env": {
        "EGIPCI_COOKIE": "your_cookie_here"
      }
    }
  }
}
```

#### 🔍 Monitoring

- **Monitor** MCP server logs for unusual activity
- **Check** for unauthorized access attempts
- **Update** to latest versions promptly

### For Developers

#### 🧪 Secure Development

- **Validate** all inputs
- **Sanitize** outputs
- **Use** parameterized queries
- **Implement** proper error handling
- **Follow** OWASP guidelines

#### 🔒 Dependencies

- **Keep** dependencies updated
- **Run** security audits regularly: `pnpm audit`
- **Review** dependency changes
- **Use** lock files

#### 🛠️ Code Review

- **Review** all code changes
- **Check** for security implications
- **Test** security scenarios
- **Document** security considerations

## Known Security Considerations

### 🍪 Cookie Handling

- Cookies are handled securely and not logged
- Environment variables are preferred over parameters
- No cookie data is transmitted to external services (except EGIPCI)

### 🌐 Network Security

- All EGIPCI requests use HTTPS
- No data is cached permanently
- Request/response data is not logged by default

### 🔐 Authentication

- Authentication is handled by EGIPCI service
- No credentials are stored locally
- Cookie expiration is respected

## Security Tools and Automation

### 🤖 Automated Security Checks

Our CI/CD pipeline includes:

- **Dependency scanning** with `pnpm audit`
- **Code analysis** with CodeQL (when enabled)
- **Security linting** with ESLint security plugins
- **Container scanning** (if applicable)

### 🔍 Manual Security Reviews

- **Code reviews** for all changes
- **Security impact** assessment for new features
- **Penetration testing** for major releases
- **Third-party audits** when appropriate

## Vulnerability Disclosure

### 🎯 Coordinated Disclosure

We follow responsible disclosure practices:

1. **Private reporting** and investigation
2. **Fix development** and testing
3. **Security release** with fix
4. **Public disclosure** with details
5. **Credit** to reporter (if desired)

### 📢 Public Disclosure

After a fix is released, we will:

- **Publish** a security advisory
- **Update** the changelog
- **Notify** users through GitHub releases
- **Provide** migration guidance if needed

## Security Contact

- **GitHub Security Advisories**: [Create Advisory](https://github.com/d0whc3r/egipci-mcp/security/advisories/new)
- **Issues**: [Security Issue Template](https://github.com/d0whc3r/egipci-mcp/issues/new?template=security_report.yml)
- **Maintainer**: [@d0whc3r](https://github.com/d0whc3r)

## Acknowledgments

We appreciate security researchers and users who help keep EGIPCI MCP Server secure. Contributors who report valid security issues will be:

- **Credited** in the security advisory (if desired)
- **Listed** in our security acknowledgments
- **Thanked** in release notes

## Legal

This security policy is provided in good faith. We reserve the right to:

- **Modify** this policy at any time
- **Determine** the severity and validity of reports
- **Coordinate** disclosure timelines based on complexity

---

Thank you for helping keep EGIPCI MCP Server and its users safe! 🛡️
