# 🚀 AlgoMentor Deployment Guide

## Render (Backend) + Netlify (Frontend)

This guide will help you deploy AlgoMentor to production using Render for the backend and Netlify for the frontend.

---

## 📋 Prerequisites

- GitHub account
- Render account (free tier available): https://render.com
- Netlify account (free tier available): https://netlify.com
- PostgreSQL database (Render provides free tier)

---

## 🗄️ Part 1: Deploy Backend to Render

### Step 1: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `algomentor-db`
   - **Database**: `algomentor`
   - **User**: `algomentor_user`
   - **Region**: Choose closest to you
   - **Plan**: Free (or paid for production)
4. Click "Create Database"
5. **Save the connection details** (you'll need them)

### Step 2: Create Web Service on Render

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `algomentor-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: Leave empty (backend is in root)
   - **Runtime**: `Java`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/algomentor-1.0.0.jar`
   - **Plan**: Free (or paid for production)

### Step 3: Add Environment Variables

In Render dashboard, go to your web service → Environment:

```env
# Database Configuration
DATABASE_URL=<your-render-postgres-internal-url>
DATABASE_USERNAME=algomentor_user
DATABASE_PASSWORD=<your-database-password>

# JWT Configuration (CRITICAL: Generate secure key)
JWT_SECRET=<generate-with-openssl-rand-base64-64>
JWT_EXPIRATION=18000000

# CORS Configuration (Add your Netlify URL after frontend deployment)
CORS_ALLOWED_ORIGINS=https://your-app.netlify.app

# Spring Profile
SPRING_PROFILES_ACTIVE=prod

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_DURATION=60000
```

**Generate JWT Secret:**
```bash
openssl rand -base64 64
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Once deployed, note your backend URL: `https://algomentor-backend.onrender.com`

### Step 5: Verify Backend

```bash
curl https://algomentor-backend.onrender.com/actuator/health
```

**Expected:** `{"status":"UP"}`

---

## 🎨 Part 2: Deploy Frontend to Netlify

### Step 1: Update Frontend Configuration

Before deploying, update the API URL in your frontend:

1. Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://algomentor-backend.onrender.com/api/v1
```

2. Commit and push changes:
```bash
git add frontend/.env.production
git commit -m "Add production API URL"
git push origin main
```

### Step 2: Deploy to Netlify

#### Option A: Netlify UI (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Click "Deploy site"

#### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from frontend directory
cd frontend
netlify deploy --prod
```

### Step 3: Configure Custom Domain (Optional)

1. In Netlify dashboard → Domain settings
2. Add custom domain
3. Follow DNS configuration instructions

### Step 4: Update CORS in Backend

1. Go back to Render dashboard
2. Update `CORS_ALLOWED_ORIGINS` environment variable:
```env
CORS_ALLOWED_ORIGINS=https://your-app.netlify.app,https://www.your-domain.com
```
3. Redeploy backend

---

## ✅ Verification Checklist

### Backend (Render)
- [ ] Database created and running
- [ ] Web service deployed successfully
- [ ] Environment variables configured
- [ ] Health endpoint returns UP
- [ ] Swagger UI loads: `https://your-backend.onrender.com/swagger-ui.html`

### Frontend (Netlify)
- [ ] Site deployed successfully
- [ ] Can access login page
- [ ] API URL points to Render backend
- [ ] CORS configured in backend

### Integration
- [ ] Can create account
- [ ] Can login
- [ ] Dashboard loads
- [ ] API calls work
- [ ] No CORS errors in browser console

---

## 🔐 Security Checklist

Before going live:

- [ ] Generated strong JWT secret (min 32 characters)
- [ ] Set strong database password
- [ ] Configured specific CORS origins (no wildcards)
- [ ] Enabled HTTPS (automatic on Render/Netlify)
- [ ] Reviewed rate limits
- [ ] Changed default teacher password
- [ ] Set up database backups (Render paid plans)
- [ ] Configured custom domain with SSL

---

## 📊 Monitoring

### Render Monitoring
- **Logs**: Render Dashboard → Your Service → Logs
- **Metrics**: Render Dashboard → Your Service → Metrics
- **Health**: `https://your-backend.onrender.com/actuator/health`

### Netlify Monitoring
- **Analytics**: Netlify Dashboard → Analytics
- **Deploy logs**: Netlify Dashboard → Deploys
- **Functions logs**: Netlify Dashboard → Functions

---

## 🐛 Troubleshooting

### Backend Issues

#### Build Fails
```bash
# Check build logs in Render dashboard
# Common issues:
# 1. Java version mismatch - Ensure Java 17+ in render.yaml
# 2. Maven dependencies - Check pom.xml
# 3. Out of memory - Upgrade Render plan
```

#### Database Connection Failed
```bash
# Verify environment variables
# Check DATABASE_URL format: jdbc:postgresql://host:port/database
# Ensure database is in same region as web service
```

#### CORS Errors
```bash
# Update CORS_ALLOWED_ORIGINS in Render
# Include both http and https versions
# Include www and non-www versions
```

### Frontend Issues

#### Build Fails
```bash
# Check Netlify deploy logs
# Common issues:
# 1. Node version - Add .nvmrc file with version
# 2. Missing dependencies - Check package.json
# 3. Build command - Verify in netlify.toml
```

#### Can't Connect to Backend
```bash
# Verify REACT_APP_API_URL in .env.production
# Check backend is running on Render
# Verify CORS is configured
# Check browser console for errors
```

---

## 💰 Cost Estimation

### Free Tier (Development/Testing)
- **Render**: Free PostgreSQL + Free Web Service
- **Netlify**: Free hosting + 100GB bandwidth
- **Total**: $0/month

### Production (Recommended)
- **Render**: 
  - PostgreSQL: $7/month
  - Web Service: $7/month
- **Netlify**: 
  - Pro: $19/month (optional)
- **Total**: $14-33/month

---

## 🔄 Continuous Deployment

Both Render and Netlify support automatic deployments:

### Render
- Automatically deploys on push to `main` branch
- Configure in: Dashboard → Service → Settings → Build & Deploy

### Netlify
- Automatically deploys on push to `main` branch
- Configure in: Dashboard → Site Settings → Build & Deploy

### Workflow
```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Automatic deployment triggers
# Backend: Render rebuilds and deploys
# Frontend: Netlify rebuilds and deploys
```

---

## 📈 Scaling

### Render Scaling
- **Vertical**: Upgrade to higher tier plans
- **Horizontal**: Add more instances (paid plans)
- **Database**: Upgrade PostgreSQL plan

### Netlify Scaling
- Automatic CDN scaling
- Serverless functions for API
- Global edge network

---

## 🔧 Advanced Configuration

### Custom Build Configuration

Create `render.yaml` in root:
```yaml
services:
  - type: web
    name: algomentor-backend
    env: java
    buildCommand: mvn clean package -DskipTests
    startCommand: java -jar target/algomentor-1.0.0.jar
    envVars:
      - key: SPRING_PROFILES_ACTIVE
        value: prod
      - key: DATABASE_URL
        fromDatabase:
          name: algomentor-db
          property: connectionString
```

Create `netlify.toml` in root:
```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## 📞 Support

### Render Support
- **Docs**: https://render.com/docs
- **Community**: https://community.render.com
- **Status**: https://status.render.com

### Netlify Support
- **Docs**: https://docs.netlify.com
- **Community**: https://answers.netlify.com
- **Status**: https://www.netlifystatus.com

### AlgoMentor Support
- **GitHub Issues**: https://github.com/Adi6tnine/Algo-mentor/issues
- **Repository**: https://github.com/Adi6tnine/Algo-mentor

---

## ✅ Post-Deployment

After successful deployment:

1. **Test all features**
   - Authentication
   - Problem tracking
   - Analytics
   - Profile sync

2. **Update documentation**
   - Add production URLs to README
   - Update API documentation

3. **Set up monitoring**
   - Configure uptime monitoring
   - Set up error tracking
   - Enable analytics

4. **Backup strategy**
   - Enable Render database backups
   - Export data regularly

5. **Security audit**
   - Review environment variables
   - Check CORS configuration
   - Verify HTTPS is enabled
   - Test rate limiting

---

## 🎉 Success!

Your AlgoMentor application is now live!

- **Frontend**: https://your-app.netlify.app
- **Backend**: https://your-backend.onrender.com
- **API Docs**: https://your-backend.onrender.com/swagger-ui.html

**Default Credentials:**
- Email: teacher@algomentor.com
- Password: teacher123

**Remember to change the default password!**

---

**Version**: 1.0.0  
**Last Updated**: February 2026
