# 🚀 Quick Render Deployment Checklist

## Pre-Deployment (5 minutes)

- [ ] Commit all changes: `git add . && git commit -m "Deployment ready" && git push`
- [ ] Verify [render.yaml](render.yaml) exists in root
- [ ] Verify [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md) for detailed steps

## Step 1: MongoDB Setup (10 minutes)

```
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user (shopsphere_user)
4. Get connection string
5. Replace username:password in string
```

**Your Connection String:**
```
mongodb+srv://username:password@cluster.mongodb.net/shopsphere?retryWrites=true&w=majority
```

## Step 2: Deploy Backend (5 minutes)

```
1. Go to https://render.com
2. Sign in with GitHub
3. Click New > Web Service
4. Select your repository
5. Configure:
   - Name: shopsphere-backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   - Root Directory: backend
   - Plan: Free

6. Add Environment Variables:
   NODE_ENV=production
   MONGO_URI=YOUR_CONNECTION_STRING
   CLIENT_URL=YOUR_FRONTEND_URL
   JWT_SECRET=GenerateRandomSecret

7. Click Deploy
8. Get your Backend URL (e.g., https://shopsphere-backend.onrender.com)
```

## Step 3: Deploy Frontend (3 minutes)

### Option A: Vercel (Recommended)

```
1. Go to https://vercel.com
2. Import project from GitHub
3. Configure:
   - Framework: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output: dist

4. Add Environment Variable:
   VITE_API_URL=https://shopsphere-backend.onrender.com

5. Deploy
6. Get your Frontend URL
```

### Option B: Render (Alternative)

```
1. In Render, click New > Static Site
2. Select repository
3. Configure:
   - Build Command: cd frontend && npm install && npm run build
   - Publish Directory: frontend/dist
   - Root Directory: .

4. Add Environment Variable:
   VITE_API_URL=https://shopsphere-backend.onrender.com

5. Deploy
```

## Step 4: Test Deployment

```bash
# Test Backend
curl https://shopsphere-backend.onrender.com/

# Test Products API
curl https://shopsphere-backend.onrender.com/api/products

# Visit Frontend URL in Browser
# Test login, products, cart
```

## ✅ You're Live!

Your app is now running on:
- **Backend:** https://shopsphere-backend.onrender.com
- **Frontend:** Your Vercel/Render URL

---

## 📋 Environment Variables Quick Reference

### Backend (Render)
```
NODE_ENV=production
MONGO_URI=mongodb+srv://...
CLIENT_URL=https://your-frontend.com
JWT_SECRET=random_secret_string
```

### Frontend (Vercel/Render)
```
VITE_API_URL=https://shopsphere-backend.onrender.com
```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MONGO_URI in Render env vars |
| Frontend can't reach backend | Update VITE_API_URL and redeploy |
| CORS error | Verify CLIENT_URL matches frontend domain |
| Database error | Verify connection string and MongoDB user |

---

**For detailed guide, see:** [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)
