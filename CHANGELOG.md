# Changelog

All notable changes to AlgoMentor will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-26

### Added - Production Ready Release

#### Backend
- ✅ Fixed database schema mismatch between migrations and JPA entities
- ✅ Added Flyway for database migrations
- ✅ Added Spring Boot Actuator for health checks and monitoring
- ✅ Implemented rate limiting with Bucket4j (100 requests/minute)
- ✅ Added OpenAPI/Swagger documentation
- ✅ Implemented environment variable validation for production
- ✅ Added HikariCP connection pooling configuration
- ✅ Added security headers (X-Frame-Options, CSP, XSS Protection)
- ✅ Fixed CORS configuration to use specific origins (no wildcards)
- ✅ Added input sanitization utilities with OWASP Encoder
- ✅ Implemented structured logging with rotation
- ✅ Added request timeout configuration (60 seconds)
- ✅ Updated all API endpoints to use `/api/v1` prefix

#### Frontend
- ✅ Updated API base URL to use `/api/v1`
- ✅ Added environment variable support for API URL
- ✅ Improved error handling across all components
- ✅ Added loading states for better UX
- ✅ Enhanced mobile responsiveness

#### DevOps & Infrastructure
- ✅ Created production-ready `docker-compose.yml`
- ✅ Added multi-stage Dockerfile for backend (optimized build)
- ✅ Added multi-stage Dockerfile for frontend (Nginx-based)
- ✅ Created `.dockerignore` files for both backend and frontend
- ✅ Added health checks to all Docker services
- ✅ Configured Nginx with security headers and gzip compression
- ✅ Created Makefile for common development tasks
- ✅ Added comprehensive environment variable configuration

#### Documentation
- ✅ Created comprehensive README with quick start guide
- ✅ Added PRODUCTION_DEPLOYMENT.md with cloud deployment guides
- ✅ Created LEGAL_DISCLAIMER.md for web scraping notice
- ✅ Added detailed API documentation
- ✅ Created troubleshooting guide
- ✅ Added production checklist
- ✅ Documented all environment variables

#### Security
- ✅ Removed hardcoded JWT secrets
- ✅ Implemented BCrypt password hashing
- ✅ Added role-based access control (RBAC)
- ✅ Implemented rate limiting to prevent API abuse
- ✅ Added brute-force protection
- ✅ Configured security headers
- ✅ Disabled H2 console in production
- ✅ Added input validation and sanitization
- ✅ Implemented CORS with specific origins

#### Testing
- ✅ Added unit tests for services
- ✅ Configured test infrastructure
- ✅ Added health check endpoints

### Changed
- 🔄 Updated Spring Boot to 3.2.0
- 🔄 Updated React to 18
- 🔄 Migrated from wildcard CORS to specific origins
- 🔄 Changed API prefix from `/api` to `/api/v1`
- 🔄 Updated database schema to include all required fields
- 🔄 Improved error messages and validation

### Fixed
- 🐛 Fixed database table name mismatch (app_users vs users)
- 🐛 Fixed missing database indexes
- 🐛 Fixed CORS security vulnerability
- 🐛 Fixed missing environment variable validation
- 🐛 Fixed password validation inconsistency
- 🐛 Fixed missing rate limiting implementation
- 🐛 Fixed Docker health checks
- 🐛 Fixed frontend API URL configuration

### Security
- 🔒 Removed wildcard CORS origins
- 🔒 Added JWT secret validation
- 🔒 Implemented rate limiting
- 🔒 Added security headers
- 🔒 Added input sanitization
- 🔒 Disabled H2 console in production

### Removed
- ❌ Removed hardcoded secrets
- ❌ Removed unused dependencies
- ❌ Removed commented code
- ❌ Removed @CrossOrigin annotations (handled globally)

## [0.9.0] - 2026-02-07

### Added
- Initial release with basic functionality
- Student and teacher authentication
- Problem tracking
- HackerRank and LeetCode integration
- Analytics dashboard
- Basic Docker support

### Known Issues
- Database schema mismatch
- Missing Flyway configuration
- CORS security vulnerability
- No rate limiting
- Missing production documentation

---

## Upgrade Guide

### From 0.9.0 to 1.0.0

#### Backend Changes

1. **Update Environment Variables**
   ```bash
   # Add new required variables
   CORS_ALLOWED_ORIGINS=https://yourdomain.com
   RATE_LIMIT_REQUESTS=100
   RATE_LIMIT_DURATION=60000
   ```

2. **Update API Endpoints**
   - All endpoints now use `/api/v1` prefix
   - Update frontend API calls accordingly

3. **Database Migration**
   - Flyway will automatically apply migrations
   - Backup database before upgrading
   ```bash
   docker-compose exec postgres pg_dump -U algomentor_user algomentor > backup.sql
   ```

4. **Update Docker Compose**
   ```bash
   docker-compose down
   docker-compose pull
   docker-compose up -d
   ```

#### Frontend Changes

1. **Update Environment Variables**
   ```bash
   # Update .env
   REACT_APP_API_URL=http://localhost:8080/api/v1
   ```

2. **Rebuild Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

#### Breaking Changes

- ⚠️ API endpoints changed from `/api/*` to `/api/v1/*`
- ⚠️ CORS now requires specific origins (no wildcards)
- ⚠️ JWT_SECRET must be at least 32 characters in production
- ⚠️ Database schema updated (automatic migration)

---

## Future Roadmap

### Version 1.1.0 (Planned)
- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Redis caching for improved performance
- [ ] Advanced analytics and reporting
- [ ] Bulk student import via CSV
- [ ] Mobile app (React Native)

### Version 1.2.0 (Planned)
- [ ] Multi-tenancy support
- [ ] Custom branding
- [ ] Advanced role management
- [ ] Integration with more coding platforms
- [ ] Gamification features (badges, leaderboards)
- [ ] Real-time notifications

### Version 2.0.0 (Future)
- [ ] Machine learning for progress prediction
- [ ] AI-powered problem recommendations
- [ ] Social features
- [ ] API marketplace
- [ ] White-label solution

---

**For detailed information about each release, see the [GitHub Releases](https://github.com/spacky12/AlgoMentor/releases) page.**
