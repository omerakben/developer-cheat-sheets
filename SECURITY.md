# Security Policy

## Supported Versions

We actively support the following versions of Developer Cheat Sheets:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Developer Cheat Sheets seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:

- Open a public GitHub issue for security vulnerabilities
- Discuss the vulnerability publicly before it has been addressed

### Please DO:

1. **Email us directly** at: me@omerakben.com (or create a private security advisory on GitHub)
2. **Provide detailed information** including:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Suggested fix (if any)
3. **Allow reasonable time** for us to respond and address the issue

### What to Expect:

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Assessment**: We will assess the vulnerability and determine its severity within 7 days
- **Fix Timeline**: Critical vulnerabilities will be fixed within 30 days
- **Credit**: With your permission, we will credit you in the release notes

### Security Best Practices for Contributors:

When contributing to this project, please:

1. **Never commit sensitive data**:
   - API keys
   - Passwords
   - Private keys
   - Personal information

2. **Follow secure coding practices**:
   - Validate all user inputs
   - Use prepared statements for any database queries
   - Implement proper error handling
   - Follow OWASP guidelines

3. **Keep dependencies updated**:
   - Regularly run `npm audit`
   - Update dependencies when security patches are available
   - Review dependency changes before updating

4. **Review code for common vulnerabilities**:
   - XSS (Cross-Site Scripting)
   - CSRF (Cross-Site Request Forgery)
   - SQL Injection
   - Authentication bypass
   - Insecure data storage

### Scope:

This security policy applies to:

- The main application code in this repository
- Dependencies used by the application
- The deployment infrastructure (when applicable)
- User data handling and storage

### Out of Scope:

- Issues in third-party dependencies (please report to the respective projects)
- Social engineering attacks
- Physical security
- Denial of service attacks on public deployments

## Security Update Process

When a security vulnerability is confirmed:

1. A private security advisory will be created
2. A fix will be developed and tested
3. A security update will be released
4. Public disclosure will be made after users have had time to update

## Contact

For security-related inquiries:
- Email: me@omerakben.com
- GitHub: [@omerakben](https://github.com/omerakben)

For general questions and non-security issues, please use GitHub Issues.

---

Thank you for helping keep Developer Cheat Sheets and our users safe!
