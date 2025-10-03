# Pull Request

## Description

<!-- Provide a brief description of the changes in this PR -->

## Type of Change

<!-- Mark the relevant option with an "x" -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🔧 Refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test addition or improvement
- [ ] 🔒 Security improvement
- [ ] 🏗️ Build/CI changes

## Related Issues

<!-- Link to related issues using keywords like "Fixes #123" or "Closes #456" -->

- Fixes #
- Related to #

## Changes Made

<!-- Describe the changes made in detail -->

### Added

-

### Changed

-

### Removed

-

### Fixed

-

## Testing

<!-- Describe how you tested your changes -->

### Test Environment

- OS:
- Node.js version:
- Package version:

### Test Cases

- [ ] Unit tests pass (`pnpm test`)
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Edge cases considered

### Test Commands Run

```bash
# List the commands you ran to test
pnpm run check-all
pnpm run test:coverage
```

## Configuration Changes

<!-- If applicable, describe any configuration changes -->

### MCP Configuration

```json
{
  "mcpServers": {
    "gencat-egipci": {
      // Updated configuration
    }
  }
}
```

### Environment Variables

- `EGIPCI_COOKIE`: [Description of any changes]

## Documentation

<!-- Check all that apply -->

- [ ] README updated
- [ ] API documentation updated
- [ ] Configuration examples updated
- [ ] Changelog entry added
- [ ] Comments added to complex code

## Breaking Changes

<!-- If this is a breaking change, describe the impact and migration path -->

### Impact

-

### Migration Guide

-

## Screenshots/Examples

<!-- If applicable, add screenshots or examples of the changes -->

## Performance Impact

<!-- Describe any performance implications -->

- [ ] No performance impact
- [ ] Performance improvement
- [ ] Potential performance regression (explain below)

## Security Considerations

<!-- Describe any security implications -->

- [ ] No security impact
- [ ] Security improvement
- [ ] Potential security implications (explain below)

## Checklist

<!-- Mark completed items with an "x" -->

### Code Quality

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Code is properly commented
- [ ] No console.log or debug statements left
- [ ] Error handling is appropriate

### Testing

- [ ] Tests added for new functionality
- [ ] All tests pass locally
- [ ] Test coverage maintained or improved
- [ ] Manual testing completed

### Documentation

- [ ] Documentation updated
- [ ] Examples provided for new features
- [ ] Breaking changes documented

### Dependencies

- [ ] No unnecessary dependencies added
- [ ] Dependencies are up to date
- [ ] Security audit passed (`pnpm audit`)

### Git

- [ ] Commit messages follow conventional commits
- [ ] Branch is up to date with target branch
- [ ] No merge conflicts

## Additional Notes

<!-- Any additional information that reviewers should know -->

## Reviewer Notes

<!-- For maintainers: any specific areas to focus on during review -->

---

**By submitting this PR, I confirm that:**

- [ ] I have read and agree to the project's contributing guidelines
- [ ] My code follows the project's coding standards
- [ ] I have tested my changes thoroughly
- [ ] I have updated documentation as needed
