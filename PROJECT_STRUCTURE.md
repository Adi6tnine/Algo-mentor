# 📁 AlgoMentor Project Structure

## Overview

AlgoMentor is organized as a monorepo with separate backend (Spring Boot) and frontend (React) directories, optimized for deployment on Render and Netlify.

---

## 🗂️ Directory Structure

```
AlgoMentor/
├── src/                                    # Backend Source Code
│   └── main/
│       ├── java/com/algomentor/
│       │   ├── config/                     # Configuration classes
│       │   │   ├── EnvironmentValidator.java
│       │   │   ├── OpenApiConfig.java
│       │   │   ├── RateLimitConfig.java
│       │   │   ├── SecurityConfig.java
│       │   │   └── WebConfig.java
│       │   ├── controller/                 # REST API Controllers
│       │   │   ├── AuthController.java
│       │   │   ├── HackerRankController.java
│       │   │   ├── ProblemController.java
│       │   │   ├── ProblemManagementController.java
│       │   │   ├── ProgressController.java
│       │   │   ├── StatsController.java
│       │   │   ├── StudentController.java
│       │   │   └── TeacherController.java
│       │   ├── dto/                        # Data Transfer Objects
│       │   │   ├── AuthResponse.java
│       │   │   ├── HackerRankDataDTO.java
│       │   │   ├── HackerRankProblemDTO.java
│       │   │   ├── HackerRankProfileDTO.java
│       │   │   ├── LoginRequest.java
│       │   │   ├── ProblemDTO.java
│       │   │   ├── SignupRequest.java
│       │   │   ├── StudentDTO.java
│       │   │   └── StudentProgressDTO.java
│       │   ├── exception/                  # Exception Handling
│       │   │   ├── ErrorResponse.java
│       │   │   ├── GlobalExceptionHandler.java
│       │   │   └── ResourceNotFoundException.java
│       │   ├── model/                      # JPA Entities
│       │   │   ├── Problem.java
│       │   │   ├── Student.java
│       │   │   └── User.java
│       │   ├── repository/                 # Data Access Layer
│       │   │   ├── ProblemRepository.java
│       │   │   ├── StudentRepository.java
│       │   │   └── UserRepository.java
│       │   ├── security/                   # Security & JWT
│       │   │   ├── JwtAuthenticationFilter.java
│       │   │   └── RateLimitInterceptor.java
│       │   ├── service/                    # Business Logic
│       │   │   ├── AuthService.java
│       │   │   ├── HackerRankService.java
│       │   │   ├── LeetCodeService.java
│       │   │   ├── ProblemService.java
│       │   │   ├── ProgressTrackingService.java
│       │   │   ├── ReportService.java
│       │   │   └── StudentService.java
│       │   ├── util/                       # Utility Classes
│       │   │   ├── InputSanitizer.java
│       │   │   └── JwtUtil.java
│       │   └── AlgoMentorApplication.java  # Main Application
│       └── resources/
│           ├── db/migration/               # Flyway Migrations
│           │   ├── V1__Initial_Schema.sql
│           │   └── V2__Seed_Default_Teacher.sql
│           ├── application.properties      # Dev Configuration
│           └── application-prod.properties # Prod Configuration
│
├── frontend/                               # Frontend Source Code
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/                     # React Components
│   │   │   └── AnalyticsDashboard.js
│   │   ├── App.js                          # Main App Component
│   │   ├── App.css                         # App Styles
│   │   ├── Login.js                        # Login Component
│   │   ├── Login.css                       # Login Styles
│   │   ├── TeacherDashboard.js             # Teacher Dashboard
│   │   ├── index.js                        # Entry Point
│   │   └── index.css                       # Global Styles
│   ├── .env.example                        # Environment Template
│   ├── .env.production                     # Production Config
│   ├── Dockerfile                          # Docker Config (optional)
│   ├── nginx.conf                          # Nginx Config (optional)
│   ├── package.json                        # Dependencies
│   └── package-lock.json                   # Lock File
│
├── .github/                                # GitHub Configuration
│   └── workflows/
│       └── ci.yml                          # CI/CD Pipeline
│
├── .gitignore                              # Git Ignore Rules
├── .env.example                            # Backend Env Template
├── pom.xml                                 # Maven Configuration
├── netlify.toml                            # Netlify Config
├── render.yaml                             # Render Config
├── README.md                               # Main Documentation
├── CHANGELOG.md                            # Version History
├── CONTRIBUTING.md                         # Contribution Guide
├── DEPLOYMENT.md                           # Deployment Guide
└── LEGAL_DISCLAIMER.md                     # Legal Notice
```

---

## 📦 Key Files Explained

### Backend Configuration

#### `pom.xml`
Maven project configuration with all dependencies:
- Spring Boot 3.2.0
- Spring Security + JWT
- PostgreSQL + H2
- Flyway migrations
- Actuator for monitoring
- Bucket4j for rate limiting
- SpringDoc for API docs

#### `application.properties`
Development configuration:
- H2 in-memory database
- Debug logging
- H2 console enabled
- Development CORS settings

#### `application-prod.properties`
Production configuration:
- PostgreSQL database
- Production logging
- Security hardened
- Environment-based secrets

### Frontend Configuration

#### `package.json`
React project dependencies:
- React 18
- Axios for API calls
- Recharts for analytics
- React Scripts for building

#### `.env.production`
Production environment variables:
- Backend API URL
- Environment flag

### Deployment Configuration

#### `render.yaml`
Render deployment configuration:
- PostgreSQL database setup
- Web service configuration
- Environment variables
- Health checks

#### `netlify.toml`
Netlify deployment configuration:
- Build settings
- Redirects for React Router
- Security headers
- Cache configuration

---

## 🔧 Configuration Files

### Environment Variables

#### Backend (`.env.example`)
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/algomentor
DATABASE_USERNAME=algomentor_user
DATABASE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

#### Frontend (`frontend/.env.example`)
```env
REACT_APP_API_URL=http://localhost:8080/api/v1
REACT_APP_ENV=development
```

---

## 📊 Database Schema

### Tables

1. **users**
   - id (PK)
   - email (unique)
   - password (encrypted)
   - role (STUDENT/TEACHER)
   - created_at

2. **students**
   - id (PK)
   - name
   - email (unique)
   - roll_number (unique)
   - section
   - group_name
   - hackerrank_profile
   - leetcode_profile
   - hr_total, hr_easy, hr_medium, hr_hard
   - lc_total, lc_easy, lc_medium, lc_hard
   - user_id (FK → users)
   - created_at

3. **problems**
   - id (PK)
   - title
   - platform
   - difficulty
   - status
   - solved_at
   - student_id (FK → students)

---

## 🚀 Build Process

### Backend Build
```bash
mvn clean package -DskipTests
```
**Output:** `target/algomentor-1.0.0.jar`

### Frontend Build
```bash
cd frontend
npm run build
```
**Output:** `frontend/build/` directory

---

## 🔐 Security Features

### Backend
- JWT authentication
- BCrypt password hashing
- Rate limiting (100 req/min)
- CORS protection
- Input sanitization
- Security headers
- SQL injection prevention

### Frontend
- Environment-based API URLs
- Secure token storage
- Input validation
- XSS prevention
- HTTPS enforcement (production)

---

## 📝 API Structure

### Base URL
- Development: `http://localhost:8080/api/v1`
- Production: `https://your-backend.onrender.com/api/v1`

### Endpoints
- `/auth/*` - Authentication
- `/students/*` - Student management
- `/problems/*` - Problem tracking
- `/progress/*` - Progress tracking
- `/teacher/*` - Teacher operations
- `/stats` - Statistics

### Documentation
- Swagger UI: `/swagger-ui.html`
- OpenAPI JSON: `/v3/api-docs`

---

## 🧪 Testing

### Backend Tests
```bash
mvn test
```
Location: `src/test/java/com/algomentor/`

### Frontend Tests
```bash
cd frontend
npm test
```
Location: `frontend/src/`

---

## 📚 Documentation

### User Documentation
- **README.md** - Getting started
- **DEPLOYMENT.md** - Deployment guide
- **CHANGELOG.md** - Version history

### Developer Documentation
- **CONTRIBUTING.md** - Contribution guidelines
- **PROJECT_STRUCTURE.md** - This file
- **LEGAL_DISCLAIMER.md** - Legal notice

### API Documentation
- Swagger UI (auto-generated)
- OpenAPI specification

---

## 🔄 Development Workflow

1. **Clone repository**
2. **Create feature branch**
3. **Make changes**
4. **Test locally**
5. **Commit and push**
6. **Create pull request**
7. **Automatic deployment** (on merge to main)

---

## 📦 Dependencies

### Backend (Maven)
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Actuator
- PostgreSQL Driver
- H2 Database
- JWT (jjwt)
- Flyway
- Bucket4j
- SpringDoc OpenAPI
- JSoup
- Commons CSV
- OpenPDF

### Frontend (NPM)
- React
- React DOM
- React Scripts
- Axios
- Recharts

---

## 🎯 Best Practices

### Code Organization
- ✅ Separation of concerns
- ✅ Single responsibility principle
- ✅ Dependency injection
- ✅ RESTful API design
- ✅ Clean code principles

### Security
- ✅ Environment-based secrets
- ✅ Input validation
- ✅ Output sanitization
- ✅ Secure authentication
- ✅ Rate limiting

### Performance
- ✅ Connection pooling
- ✅ Database indexing
- ✅ Caching strategies
- ✅ Lazy loading
- ✅ Code splitting

---

**Version:** 1.0.0  
**Last Updated:** February 2026
