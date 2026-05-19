# ShopSphere Render Deployment Guide

## Overview
This guide walks you through deploying ShopSphere to **Render** (backend) and optionally **Vercel** (frontend).

---

## 🔧 Prerequisites

1. **GitHub Account** - Your project must be pushed to GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account** - For cloud database at [mongodb.com/cloud](https://mongodb.com/cloud/atlas)
4. **Optional - Vercel Account** - For frontend deployment

---

## 📦 Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Cluster
- Go to [MongoDB Atlas](https://account.mongodb.com/account/login)
- Create a new project (e.g., "ShopSphere")
- Create a cluster (select **FREE tier**)
- Wait for cluster to deploy (5-10 mins)

### 1.2 Create Database User
- Go to **Database Access** > **Add New Database User**
- Username: `shopsphere_user`
- Password: Generate a strong password (save it!)
- Database User Privileges: `readWriteAnyDatabase`

### 1.3 Get Connection String
- Go to **Clusters** > **Connect**
- Select "Drivers" > Node.js
- Copy the connection string
- Replace `<username>` and `<password>` with your database user credentials
- Replace `<myFirstDatabase>` with `shopsphere`

**Example connection string:**
```
mongodb+srv://shopsphere_user:YourPassword123@cluster.mongodb.net/shopsphere?retryWrites=true&w=majority
```

---

## 📤 Step 2: Push Code to GitHub

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

---

## 🚀 Step 3: Deploy Backend to Render

### 3.1 Create Render Account & Log In
- Go to [render.com](https://render.com)
- Sign up or log in
- Connect your GitHub account

### 3.2 Create Web Service
1. Click **+ New** > **Web Service**
2. Select your GitHub repository
3. Fill in the configuration:

| Field | Value |
|-------|-------|
| **Name** | `shopsphere-backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Root Directory** | `backend` |
| **Plan** | `Free` |

### 3.3 Add Environment Variables
In the **Environment** section, add:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://shopsphere_user:YourPassword123@cluster.mongodb.net/shopsphere?retryWrites=true&w=majority
CLIENT_URL=https://your-frontend-domain.com
JWT_SECRET=your_random_secret_key_here
```

### 3.4 Deploy
- Click **Create Web Service**
- Render will automatically deploy from your GitHub repo
- You'll get a URL like: `https://shopsphere-backend.onrender.com`

### 3.5 Test Backend
```bash
curl https://shopsphere-backend.onrender.com/
# Should return: {"message": "ShopSphere API is running"}
```

---

## 🎨 Step 4: Deploy Frontend (Optional - Vercel Recommended)

### 4.1 Using Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New** > **Project**
4. Select your repository
5. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variable:
```
VITE_API_URL=https://shopsphere-backend.onrender.com
```

7. Click **Deploy**

### 4.2 Alternative: Deploy Frontend to Render

1. In Render, create a **Static Site**
2. Connect GitHub repository
3. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Root Directory**: `.`

4. Add Environment Variable:
```
VITE_API_URL=https://shopsphere-backend.onrender.com
```

---

## ⚙️ Step 5: Connect Frontend to Backend

### 5.1 Update API URL
After getting your Render backend URL, update:

**File:** `frontend/.env.production`
```
VITE_API_URL=https://shopsphere-backend.onrender.com
```

### 5.2 Redeploy Frontend
- Push changes to GitHub
- Frontend deployment will auto-redeploy

---

## 🧪 Step 6: Verify Deployment

### Backend Tests
```bash
# Test API health
curl https://shopsphere-backend.onrender.com/

# Test product endpoint
curl https://shopsphere-backend.onrender.com/api/products

# Test auth endpoint
curl -X POST https://shopsphere-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Frontend Tests
- Visit your frontend URL
- Try to browse products
- Test login/registration
- Add items to cart
- Verify API calls work (check browser Network tab)

---

## 🔒 Security Checklist

- ✅ MongoDB user created with strong password
- ✅ CORS configured with frontend domain
- ✅ Environment variables not committed to GitHub
- ✅ JWT_SECRET is random and secure
- ✅ NODE_ENV set to `production`

---

## 🐛 Troubleshooting

### Backend showing blank screen
- Check Render **Logs** for error messages
- Verify MongoDB connection string is correct
- Ensure database user has proper permissions

### Frontend can't connect to backend
- Check `VITE_API_URL` in frontend `.env.production`
- Verify CORS is configured correctly in backend
- Check browser console for network errors

### "MONGO_URI is missing or invalid"
- Verify `MONGO_URI` is set in Render environment variables
- Check MongoDB connection string format
- Test connection locally with: `MONGO_URI=your_string npm start`

### Deployment keeps failing
- Check **Build Logs** in Render
- Ensure `package.json` has correct scripts
- Try `npm install` locally to catch dependency issues

---

## 📝 Environment Variables Reference

### Backend (.env)
```
NODE_ENV=production          # Set to production
PORT=5000                    # Render assigns this automatically
MONGO_URI=...                # MongoDB connection string
CLIENT_URL=...               # Frontend URL for CORS
JWT_SECRET=...               # Random secret for JWT
```

### Frontend (.env.production)
```
VITE_API_URL=...            # Backend URL from Render
```

---

## 🔄 Deployment Workflow

1. **Local Development** → Push to GitHub
2. **GitHub** → Auto-webhook triggers Render
3. **Render** → Pulls code, runs build, starts service
4. **Live** → Your app is running at provided URL

---

## 💡 Pro Tips

- **Free Tier Limitation**: Render spins down free services after 15 mins of inactivity
- **Cold Starts**: First request after inactivity takes 30-60 seconds
- **Logs**: Check Render **Logs** tab for real-time debugging
- **Database**: MongoDB Atlas has free tier with 512MB storage
- **Custom Domain**: You can add custom domain in Render settings

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Vercel Docs**: https://vercel.com/docs (if using Vercel)

---

## ✨ You're Done!

Your ShopSphere app is now live! 🎉

- **Backend URL**: `https://shopsphere-backend.onrender.com`
- **Frontend URL**: `https://your-domain.vercel.app` (or Render)
