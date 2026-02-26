# AlgoMentor 🎓

> A production-ready full-stack application for tracking coding problem-solving progress across multiple platforms.

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Docker Deployment](#-docker-deployment)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Production Checklist](#-production-checklist)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- 🎯 **Student Management** - Create, read, update, and delete student profiles
- 📊 **Problem Tracking** - Track problems solved across multiple platforms
- 🔄 **Automated Sync** - Fetch data from HackerRank and LeetCode profiles
- 📈 **Analytics Dashboard** - Visualize progress with interactive charts
- 👥 **Role-Based Access** - Separate interfaces for teachers and students
- 🔍 **Search & Filter** - Find students and problems quickly

### Security Features
- 🔐 JWT-based authentication
- 🛡️ BCrypt password encryption
- 🚦 Rate limiting (100 requests/minute)
- 🔒 CORS protection
- 🛡️ Security headers (XSS, CSP, etc.)
- ⚡ Brute-force protection

### Production Features
- 🐳 Docker containerization
- 🗄️ PostgreSQL database with migrations
- 📊 Health checks and monitoring
- 📝 Comprehensive logging
- 🔄 Connection pooling
- 📚 OpenAPI/Swagger documentation

## 🏗️ Architecture

```
AlgoMentor/
├── src/main/java/com/algomentor/  # Spring Boot Application
│   ├── config/                     # Configuration classes
│   ├── controller/                 # REST API controllers
│   ├── service/                    # Business logic
│   ├── repository/                 # Data access layer
│   ├── dto/                        # Data transfer objects
│   ├── model/                      # JPA entities
│   ├── security/                   # Security & JWT
│   ├── exception/                  # Exception handling
│   └── util/                       # Utility classes
├── frontend/                       # React Application
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API services
│   │   └── utils/                  # Utility functions
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml              # Docker orchestration
└── Makefile                        # Build automation
```

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.2.0
- **Language:** Java 17
- **Database:** PostgreSQL 14 (prod), H2 (dev)
- **Security:** Spring Security + JWT
- **API Docs:** Swagger/OpenAPI
- **Build Tool:** Maven
- **Migrations:** Flyway

### Frontend
- **Framework:** React 18
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Build Tool:** Create React App
- **Server:** Nginx (production)

### DevOps
- **Backend Hosting:** Render
- **Frontend Hosting:** Netlify
- **Database:** PostgreSQL (Render)
- **CI/CD:** Automatic deployment on push
- **Monitoring:** Spring Boot Actuator

## 📦 Prerequisites

### For Local Development
- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- PostgreSQL 14+ (for production mode)

### For Cloud Deployment
- GitHub account
- Render account (free tier available)
- Netlify account (free tier available)

## 🚀 Quick Start

### Option 1: Deploy to Cloud (Recommended)

Deploy to Render (backend) and Netlify (frontend) with one click:

1. **Fork this repository** to your GitHub account

2. **Deploy Backend to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your forked repository
   - Render will auto-detect `render.yaml` configuration
   - Click "Apply" to deploy

3. **Deploy Frontend to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your forked repository
   - Netlify will auto-detect `netlify.toml` configuration
   - Click "Deploy site"

4. **Update CORS:**
   - Copy your Netlify URL
   - Update `CORS_ALLOWED_ORIGINS` in Render dashboard
   - Redeploy backend

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.**

### Option 2: Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Adi6tnine/Algo-mentor.git
cd Algo-mentor

# 2. Start Backend (Terminal 1)
mvn spring-boot:run

# 3. Start Frontend (Terminal 2)
cd frontend
npm install
npm start

# 4. Access the application
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
# API Docs: http://localhost:8080/swagger-ui.html
```

### Default Credentials

**Teacher Account:**
- Email: `teacher@algomentor.com`
- Password: `teacher123`

## 🔐 Environment Variables

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_NAME` | PostgreSQL database name | `algomentor` |
| `DATABASE_USERNAME` | Database username | `algomentor_user` |
| `DATABASE_PASSWORD` | Database password | `SecurePass123!` |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | Generate with `openssl rand -base64 64` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `https://yourdomain.com` |

### Optional Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_EXPIRATION` | JWT token expiration (ms) | `18000000` (5 hours) |
| `RATE_LIMIT_REQUESTS` | Max requests per window | `100` |
| `RATE_LIMIT_DURATION` | Rate limit window (ms) | `60000` (1 minute) |
| `BACKEND_PORT` | Backend port | `8080` |
| `FRONTEND_PORT` | Frontend port | `80` |

### Generating Secure JWT Secret

```bash
# Generate a secure 64-character secret
openssl rand -base64 64
```

## ☁️ Cloud Deployment

### Deploy to Render + Netlify

**Complete deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md)

**Quick Steps:**

1. Fork this repository
2. Deploy backend to Render (auto-detects `render.yaml`)
3. Deploy frontend to Netlify (auto-detects `netlify.toml`)
4. Update CORS in Render with your Netlify URL
5. Done! Your app is live

**Free Tier Available:**
- Render: Free PostgreSQL + Free Web Service
- Netlify: Free hosting + 100GB bandwidth

**Automatic Deployments:**
- Push to `main` branch triggers automatic deployment
- No manual steps required after initial setup

## 💻 Development

### Backend Development

```bash
# Run with development profile
mvn spring-boot:run

# Run tests
mvn test

# Build JAR
mvn clean package

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Database Migrations

Migrations are automatically applied on startup using Flyway.

```sql
-- Location: src/main/resources/db/migration/
-- V1__Initial_Schema.sql
-- V2__Seed_Default_Teacher.sql
```

## 📚 API Documentation

### Accessing Swagger UI

Once the application is running:
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/v3/api-docs

### API Endpoints

#### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user

#### Students
- `GET /api/v1/students` - Get all students
- `GET /api/v1/students/{id}` - Get student by ID
- `POST /api/v1/students` - Create student
- `PUT /api/v1/students/{id}` - Update student
- `DELETE /api/v1/students/{id}` - Delete student

#### Problems
- `GET /api/v1/students/{studentId}/problems` - Get student problems
- `POST /api/v1/students/{studentId}/problems` - Add problem
- `PUT /api/v1/problems/{id}` - Update problem
- `DELETE /api/v1/problems/{id}` - Delete problem

#### Progress Tracking
- `POST /api/v1/progress/hackerrank/{studentId}` - Sync HackerRank
- `POST /api/v1/progress/leetcode/{studentId}` - Sync LeetCode
- `GET /api/v1/progress/my-progress` - Get my progress

#### Teacher (Requires TEACHER role)
- `GET /api/v1/teacher/sections` - Get all sections
- `GET /api/v1/teacher/section/{section}/students` - Get section students
- `POST /api/v1/teacher/section/{section}/sync-all` - Sync all students
- `GET /api/v1/teacher/section/{section}/export/{format}` - Export data

## 🔒 Security

### Implemented Security Measures

1. **Authentication & Authorization**
   - JWT-based stateless authentication
   - Role-based access control (STUDENT, TEACHER)
   - BCrypt password hashing

2. **API Security**
   - Rate limiting (100 requests/minute)
   - CORS protection with configurable origins
   - Request timeout (60 seconds)

3. **Security Headers**
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: 1; mode=block
   - Content-Security-Policy

4. **Database Security**
   - Prepared statements (SQL injection prevention)
   - Connection pooling with HikariCP
   - Encrypted passwords

### Security Best Practices

```bash
# 1. Use strong JWT secret (min 32 characters)
JWT_SECRET=$(openssl rand -base64 64)

# 2. Set specific CORS origins (no wildcards)
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# 3. Use strong database password
DATABASE_PASSWORD=$(openssl rand -base64 32)

# 4. Enable HTTPS in production
# Configure reverse proxy (Nginx/Apache) with SSL certificate

# 5. Regular security updates
docker-compose pull
docker-compose up -d
```

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=StudentServiceTest

# Run with coverage
mvn test jacoco:report
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend won't start

```bash
# Check Java version
java -version  # Should be 17+

# Check if port 8080 is in use
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Clean and rebuild
mvn clean install
```

#### 2. Frontend can't connect to backend

```bash
# Check backend is running
curl http://localhost:8080/actuator/health

# Verify API URL in frontend/.env
REACT_APP_API_URL=http://localhost:8080/api/v1

# Check CORS configuration
# Ensure frontend origin is in CORS_ALLOWED_ORIGINS
```

#### 3. Docker containers won't start

```bash
# Check Docker is running
docker ps

# View container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Rebuild images
docker-compose build --no-cache
docker-compose up -d
```

#### 4. Database connection failed

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Verify database credentials in .env
# Check DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD

# Connect to database manually
docker-compose exec postgres psql -U algomentor_user -d algomentor
```

#### 5. JWT authentication fails

```bash
# Verify JWT_SECRET is set
echo $JWT_SECRET

# Check token expiration
# Default is 5 hours (18000000 ms)

# Clear browser localStorage and login again
```

## ✅ Production Checklist

Before deploying to production:

### Security
- [ ] Generate strong JWT secret (min 32 characters)
- [ ] Set specific CORS origins (no wildcards)
- [ ] Use strong database password
- [ ] Enable HTTPS with SSL certificate
- [ ] Disable H2 console (automatic in prod profile)
- [ ] Review and update security headers
- [ ] Enable firewall rules

### Configuration
- [ ] Set all required environment variables
- [ ] Configure proper logging
- [ ] Set up database backups
- [ ] Configure monitoring and alerts
- [ ] Set appropriate rate limits
- [ ] Review connection pool settings

### Infrastructure
- [ ] Use managed PostgreSQL (AWS RDS, Azure Database, etc.)
- [ ] Set up load balancer (if needed)
- [ ] Configure CDN for frontend assets
- [ ] Set up SSL/TLS certificates
- [ ] Configure domain and DNS
- [ ] Set up log aggregation

### Testing
- [ ] Run all backend tests
- [ ] Run all frontend tests
- [ ] Perform security audit
- [ ] Load testing
- [ ] Penetration testing

### Monitoring
- [ ] Set up application monitoring
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up uptime monitoring
- [ ] Configure log rotation
- [ ] Set up database monitoring

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Code Style

- **Backend:** Follow Google Java Style Guide
- **Frontend:** Use Prettier for formatting
- **Commits:** Use conventional commits format

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Legal Disclaimer

This application includes web scraping functionality. Please read [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) before using in production.

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/Adi6tnine/Algo-mentor/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Adi6tnine/Algo-mentor/discussions)
- **Email:** support@algomentor.com

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing library
- All contributors and users of AlgoMentor

---

**Made with ❤️ by the AlgoMentor Team**

**Version:** 1.0.0  
**Last Updated:** February 2026
