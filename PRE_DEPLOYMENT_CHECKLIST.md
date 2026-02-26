# ✅ Pre-Deployment Checklist

## Before Pushing to New Repository

Use this checklist to ensure everything is ready for deployment to Render and Netlify.

---

## 📋 Repository Setup

- [ ] Create new GitHub repository
- [ ] Initialize with README (or push existing)
- [ ] Set repository to public (required for free tier)
- [ ] Add repository description
- [ ] Add topics/tags (java, spring-boot, react, render, netlify)

---

## 🔐 Security Check

### Backend
- [ ] No hardcoded secrets in code
- [ ] JWT secret uses environment variable
- [ ] Database credentials use environment variables
- [ ] CORS configured (will update after Netlify deployment)
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Input validation on all endpoints

### Frontend
- [ ] API URL uses environment variable
- [ ] No sensitive data in code
- [ ] Environment files not committed (check .gitignore)

---

## 📁 File Structure Check

### Required Files
- [ ] `pom.xml` - Maven configuration
- [ ] `render.yaml` - Render deployment config
- [ ] `netlify.toml` - Netlify deployment config
- [ ] `README.md` - Project documentation
- [ ] `DEPLOYMENT.md` - Deployment guide
- [ ] `CHANGELOG.md` - Version history
- [ ] `CONTRIBUTING.md` - Contribution guidelines
- [ ] `LEGAL_DISCLAIMER.md` - Legal notice
- [ ] `.gitignore` - Git ignore rules
- [ ] `.env.example` - Environment template

### Backend Files
- [ ] `src/main/java/` - Java source code
- [ ] `src/main/resources/` - Configuration files
- [ ] `src/main/resources/db/migration/` - Flyway migrations
- [ ] `application.properties` - Dev config
- [ ] `application-prod.properties` - Prod config

### Frontend Files
- [ ] `frontend/src/` - React source code
- [ ] `frontend/public/` - Public assets
- [ ] `frontend/package.json` - Dependencies
- [ ] `frontend/.env.example` - Environment template
- [ ] `frontend/.env.production` - Production config

---

## 🧪 Local Testing

### Backend
- [ ] Application starts without errors
- [ ] Health endpoint responds: `/actuator/health`
- [ ] Swagger UI loads: `/swagger-ui.html`
- [ ] Can create account
- [ ] Can login
- [ ] JWT authentication works
- [ ] Rate limiting works
- [ ] Database migrations run successfully

### Frontend
- [ ] Application starts without errors
- [ ] Login page displays
- [ ] Can create account
- [ ] Can login
- [ ] Dashboard loads
- [ ] API calls work
- [ ] No console errors

### Integration
- [ ] Frontend connects to backend
- [ ] CORS configured correctly
- [ ] Authentication flow works end-to-end
- [ ] All features functional

---

## 📝 Documentation Check

### README.md
- [ ] Project description
- [ ] Features list
- [ ] Tech stack
- [ ] Quick start guide
- [ ] Deployment instructions
- [ ] API documentation link
- [ ] Contributing guidelines link
- [ ] License information

### DEPLOYMENT.md
- [ ] Render deployment steps
- [ ] Netlify deployment steps
- [ ] Environment variables documented
- [ ] Troubleshooting section
- [ ] Cost estimation
- [ ] Monitoring setup

### CHANGELOG.md
- [ ] Version 1.0.0 documented
- [ ] All changes listed
- [ ] Breaking changes noted
- [ ] Future roadmap included

---

## 🚀 Deployment Preparation

### Render Setup
- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] `render.yaml` configured
- [ ] Environment variables documented
- [ ] Database plan selected (free/paid)
- [ ] Region selected

### Netlify Setup
- [ ] Netlify account created
- [ ] GitHub connected to Netlify
- [ ] `netlify.toml` configured
- [ ] Build settings verified
- [ ] Domain name ready (optional)

---

## 🔧 Configuration Files

### render.yaml
- [ ] Service name configured
- [ ] Build command correct
- [ ] Start command correct
- [ ] Environment variables listed
- [ ] Database connection configured
- [ ] Health check path set

### netlify.toml
- [ ] Base directory set to `frontend`
- [ ] Build command correct
- [ ] Publish directory set to `build`
- [ ] Redirects configured for React Router
- [ ] Security headers configured
- [ ] Node version specified

### frontend/.env.production
- [ ] REACT_APP_API_URL configured
- [ ] Points to Render backend URL
- [ ] No sensitive data

---

## 🗄️ Database

### Schema
- [ ] Flyway migrations present
- [ ] V1__Initial_Schema.sql complete
- [ ] V2__Seed_Default_Teacher.sql present
- [ ] All tables defined
- [ ] Indexes created
- [ ] Foreign keys configured

### Data
- [ ] Default teacher account seeded
- [ ] No test data in migrations
- [ ] No sensitive data in migrations

---

## 🔒 Environment Variables

### Backend (Render)
- [ ] DATABASE_URL (auto-configured by Render)
- [ ] DATABASE_USERNAME (auto-configured by Render)
- [ ] DATABASE_PASSWORD (auto-configured by Render)
- [ ] JWT_SECRET (generate: `openssl rand -base64 64`)
- [ ] JWT_EXPIRATION (default: 18000000)
- [ ] CORS_ALLOWED_ORIGINS (update after Netlify deployment)
- [ ] SPRING_PROFILES_ACTIVE (set to: prod)
- [ ] RATE_LIMIT_REQUESTS (default: 100)
- [ ] RATE_LIMIT_DURATION (default: 60000)

### Frontend (Netlify)
- [ ] REACT_APP_API_URL (set in netlify.toml)
- [ ] REACT_APP_ENV (set to: production)

---

## 📊 Monitoring Setup

### Render
- [ ] Health check configured
- [ ] Logs accessible
- [ ] Metrics enabled
- [ ] Alerts configured (optional)

### Netlify
- [ ] Deploy notifications enabled
- [ ] Analytics enabled (optional)
- [ ] Forms configured (if needed)

---

## 🧹 Cleanup

### Remove Unnecessary Files
- [ ] No Docker files (if not using Docker)
- [ ] No local test scripts
- [ ] No temporary files
- [ ] No IDE-specific files (except .vscode if needed)
- [ ] No OS-specific files (.DS_Store, Thumbs.db)

### Git Cleanup
- [ ] .gitignore up to date
- [ ] No sensitive files tracked
- [ ] No large binary files
- [ ] No node_modules committed
- [ ] No target/ directory committed

---

## 🎯 Final Checks

### Code Quality
- [ ] No compilation errors
- [ ] No linting errors
- [ ] No console.log statements (frontend)
- [ ] No TODO comments (or documented)
- [ ] Code formatted consistently

### Security
- [ ] All secrets in environment variables
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] CORS properly configured
- [ ] Rate limiting enabled

### Performance
- [ ] Database indexes created
- [ ] Connection pooling configured
- [ ] Frontend build optimized
- [ ] Static assets cached

---

## 📤 Push to Repository

### Git Commands
```bash
# Initialize git (if new repo)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Production-ready AlgoMentor v1.0.0"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/AlgoMentor.git

# Push to main
git push -u origin main
```

---

## 🚀 Deployment Steps

### 1. Deploy Backend to Render
1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Render auto-detects `render.yaml`
5. Click "Apply"
6. Wait for deployment (5-10 minutes)
7. Note backend URL: `https://algomentor-backend.onrender.com`

### 2. Update CORS
1. Copy Netlify URL (after step 3)
2. Update `CORS_ALLOWED_ORIGINS` in Render
3. Redeploy backend

### 3. Deploy Frontend to Netlify
1. Go to Netlify Dashboard
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Netlify auto-detects `netlify.toml`
5. Click "Deploy site"
6. Wait for deployment (2-5 minutes)
7. Note frontend URL: `https://your-app.netlify.app`

### 4. Verify Deployment
- [ ] Backend health check: `https://your-backend.onrender.com/actuator/health`
- [ ] Frontend loads: `https://your-app.netlify.app`
- [ ] Can create account
- [ ] Can login
- [ ] Dashboard works
- [ ] API calls successful

---

## 🎉 Post-Deployment

### Update Documentation
- [ ] Update README with live URLs
- [ ] Update DEPLOYMENT.md with actual URLs
- [ ] Add screenshots (optional)
- [ ] Update CHANGELOG with deployment date

### Test Production
- [ ] Create test account
- [ ] Test all features
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Test different browsers

### Monitor
- [ ] Check Render logs
- [ ] Check Netlify deploy logs
- [ ] Monitor error rates
- [ ] Check performance metrics

### Security
- [ ] Change default teacher password
- [ ] Review CORS settings
- [ ] Check rate limiting
- [ ] Verify HTTPS enabled

---

## 📞 Support

If you encounter issues:

1. **Check logs**
   - Render: Dashboard → Service → Logs
   - Netlify: Dashboard → Deploys → Deploy log

2. **Review documentation**
   - DEPLOYMENT.md
   - README.md
   - Render docs: https://render.com/docs
   - Netlify docs: https://docs.netlify.com

3. **Common issues**
   - Build fails: Check build logs
   - CORS errors: Update CORS_ALLOWED_ORIGINS
   - Database connection: Check DATABASE_URL
   - Frontend can't connect: Verify API URL

---

## ✅ Ready to Deploy!

Once all items are checked:

1. ✅ Push to GitHub
2. ✅ Deploy to Render
3. ✅ Deploy to Netlify
4. ✅ Update CORS
5. ✅ Test everything
6. ✅ Monitor and maintain

**Your AlgoMentor application will be live!** 🚀

---

**Version:** 1.0.0  
**Last Updated:** February 2026
