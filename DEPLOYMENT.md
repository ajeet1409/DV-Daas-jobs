# Deployment Guide - AI Voice HR Agent

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud like MongoDB Atlas)
- GitHub account
- Hosting platform account (Render, Railway, Heroku, etc.)

---

## 🚀 Deployment Steps

### **1. Backend Deployment**

#### **Option A: Deploy to Render**

1. **Push code to GitHub** (see GitHub section below)

2. **Create New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `aivoice-backend`
     - **Root Directory**: Leave empty (or `.`)
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: `Node`

3. **Add Environment Variables**
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=https://your-frontend-url.com
   ```

4. **Deploy** - Click "Create Web Service"

5. **Copy Backend URL** - e.g., `https://aivoice-backend.onrender.com`

---

#### **Option B: Deploy to Railway**

1. **Push code to GitHub**

2. **Create New Project on Railway**
   - Go to [Railway Dashboard](https://railway.app/)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Add Environment Variables**
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=https://your-frontend-url.com
   ```

4. **Configure Start Command**
   - Go to Settings → Start Command
   - Set: `npm start`

5. **Deploy** - Railway will auto-deploy

6. **Copy Backend URL** - e.g., `https://aivoice-backend.up.railway.app`

---

### **2. Frontend Deployment**

#### **Step 1: Create Environment File**

Create `AiVoiceHragent/.env.production`:

```env
VITE_BACKEND_URL=https://your-backend-url.com
```

Replace `https://your-backend-url.com` with your actual backend URL from step 1.

---

#### **Step 2: Build Frontend**

```bash
cd AiVoiceHragent
npm install
npm run build
```

This creates a `dist/` folder with optimized production files.

---

#### **Step 3: Deploy Frontend**

**Option A: Deploy to Netlify**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   cd AiVoiceHragent
   netlify deploy --prod
   ```

3. **Follow prompts**:
   - Authorize with GitHub
   - Choose "Create & configure a new site"
   - Publish directory: `dist`

4. **Copy Frontend URL** - e.g., `https://aivoice-hr.netlify.app`

---

**Option B: Deploy to Vercel**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd AiVoiceHragent
   vercel --prod
   ```

3. **Follow prompts** and copy the deployment URL

---

**Option C: Serve from Backend (Single Server)**

If you want to serve both frontend and backend from one server:

1. **Build frontend**
   ```bash
   npm run build
   ```

2. **Backend already configured** to serve `dist/` folder

3. **Deploy backend** (Render/Railway) - it will serve both API and frontend

4. **Access app** at backend URL (e.g., `https://aivoice-backend.onrender.com`)

---

### **3. Update Backend CORS**

After deploying frontend, update backend `.env`:

```env
FRONTEND_URL=https://your-frontend-url.netlify.app
```

Or if serving from same server:

```env
FRONTEND_URL=https://your-backend-url.onrender.com
```

Redeploy backend for changes to take effect.

---

## 🔧 Environment Variables Summary

### **Backend (.env)**
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
FRONTEND_URL=https://your-frontend-url.com
```

### **Frontend (AiVoiceHragent/.env.production)**
```env
VITE_BACKEND_URL=https://your-backend-url.com
```

---

## 📦 GitHub Push Instructions

```bash
# Initialize git (if not already done)
git init

# Add all files
git add -A

# Commit
git commit -m "Initial deployment setup"

# Create GitHub repository
# Go to https://github.com/new and create a new repository

# Add remote
git remote add origin https://github.com/yourusername/aivoice-hr.git

# Push to GitHub
git push -u origin main
```

---

## ✅ Testing Deployment

1. **Test Backend Health**
   ```
   https://your-backend-url.com/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**
   - Open frontend URL
   - Try login/signup
   - Make a test call
   - Check call history

3. **Check Browser Console**
   - Should NOT see `ERR_CONNECTION_REFUSED`
   - Should see successful API calls

---

## 🐛 Troubleshooting

### **ERR_CONNECTION_REFUSED**
- ✅ Backend server is running
- ✅ Frontend `.env.production` has correct backend URL
- ✅ Rebuild frontend after changing `.env.production`
- ✅ Backend CORS allows frontend URL

### **CORS Errors**
- ✅ Backend `.env` has `FRONTEND_URL` set correctly
- ✅ Restart backend after changing `.env`

### **404 on Refresh**
- ✅ Backend catch-all route is configured (already done)
- ✅ Netlify/Vercel: Add `_redirects` file (see below)

---

## 📝 Additional Files for Deployment

### **Netlify (_redirects file)**

Create `AiVoiceHragent/public/_redirects`:

```
/*    /index.html   200
```

This ensures React Router works on page refresh.

---

## 🎯 Quick Deployment Checklist

- [ ] MongoDB database created
- [ ] Backend deployed with environment variables
- [ ] Backend URL copied
- [ ] Frontend `.env.production` created with backend URL
- [ ] Frontend built (`npm run build`)
- [ ] Frontend deployed
- [ ] Backend CORS updated with frontend URL
- [ ] Tested health endpoint
- [ ] Tested login/signup
- [ ] Tested making calls
- [ ] Tested call history

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs on hosting platform
3. Verify all environment variables are set correctly
4. Ensure MongoDB connection string is correct

---

**Your AI Voice HR Agent is now deployed! 🎉**

