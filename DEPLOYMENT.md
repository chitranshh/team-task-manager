# Railway Deployment Guide

This guide helps you deploy the Team Task Manager to Railway.

## Prerequisites

- Railway account (https://railway.app)
- GitHub account with repo connected
- MongoDB Atlas account (already configured with cluster)

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
cd /Users/chitranshh_/Desktop/Team-Task-Manager
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Railway Project

1. Go to https://railway.app and sign in
2. Click **New Project** → **Deploy from GitHub**
3. Select your repository: `chitranshh/team-task-manager`
4. Select the root directory (default is fine for monorepo)

### 3. Deploy Backend Service

1. In Railway dashboard, click **New** → **Empty Service**
2. Name it: `team-task-manager-backend`
3. Go to **Settings** → **Root Directory** → Set to `backend`
4. Go to **Deploy** → **Add service** and connect from GitHub
5. Add environment variables in **Variables** tab:

```
PORT=5001
MONGODB_URI=mongodb+srv://chitransh9721:Chitransh0@cluster0.6gvwux3.mongodb.net/teamtaskdb
JWT_SECRET=supersecretkey
NODE_ENV=production
```

6. Build command: (leave empty - uses package.json)
7. Start command: `npm start`
8. Railway will auto-detect from package.json and deploy

### 4. Deploy Frontend Service

1. In Railway dashboard, click **New** → **Empty Service**
2. Name it: `team-task-manager-frontend`
3. Go to **Settings** → **Root Directory** → Set to `frontend`
4. Go to **Deploy** → Add service and connect from GitHub
5. Add environment variables in **Variables** tab:

```
REACT_APP_API_URL=https://your-backend-domain.railway.app
```

(Replace with actual Railway backend URL once deployed)

6. Build command: `npm run build`
7. Start command: `npm start`
8. Deploy

### 5. Update Frontend API URL

After backend deploys:

1. Note the backend Railway domain (e.g., `team-task-manager-backend-prod.railway.app`)
2. Update frontend `REACT_APP_API_URL` in Railway Variables to: `https://your-backend-domain.railway.app`
3. Redeploy frontend

### 6. Configure Custom Domain (Optional)

1. In Railway service settings, go to **Domain** tab
2. Add custom domain if you own one
3. Update DNS records accordingly

## Testing After Deployment

1. Open frontend URL in browser
2. Sign up with test account
3. Create a project and task
4. Verify dashboard stats update
5. Test logout and login

## Troubleshooting

**Backend not connecting to MongoDB:**
- Verify MongoDB Atlas IP whitelist includes Railway IPs
- Check MONGODB_URI in Railway Variables

**Frontend API calls failing:**
- Ensure REACT_APP_API_URL is correct and doesn't have trailing slash
- Check browser console for CORS errors
- Verify backend is running

**Build failures:**
- Check Railway build logs
- Ensure Node version compatibility
- Verify package-lock.json is up to date

## Environment Variables Summary

### Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb+srv://chitransh9721:Chitransh0@cluster0.6gvwux3.mongodb.net/teamtaskdb
JWT_SECRET=supersecretkey
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-domain.railway.app
```

---

**Need help?** Check Railway docs: https://docs.railway.app/
