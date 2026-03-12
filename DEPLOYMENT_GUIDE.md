# 🚀 Deployment Guide

## Quick Deploy to Render.com (Free)

### Prerequisites
- GitHub account
- Render.com account (free)

### Step 1: Push to GitHub

```bash
cd fish-breeding-ai

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/fish-breeding-ai.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `fish-breeding-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click "Create Web Service"
6. Wait for deployment (5-10 minutes)
7. Copy your backend URL: `https://fish-breeding-backend.onrender.com`

### Step 3: Update Frontend API URL

Edit `frontend/src/App.jsx` and `frontend/src/components/PredictionPanel.jsx`:

```javascript
// Change this:
const API_BASE_URL = 'http://localhost:8000'

// To your Render backend URL:
const API_BASE_URL = 'https://fish-breeding-backend.onrender.com'
```

Commit and push:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

### Step 4: Deploy Frontend on Render

1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: `fish-breeding-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click "Create Static Site"
5. Wait for deployment (3-5 minutes)
6. Your app is live! 🎉

### Your Live URLs

- **Frontend**: `https://fish-breeding-frontend.onrender.com`
- **Backend API**: `https://fish-breeding-backend.onrender.com`

Share the frontend URL with anyone!

---

## Alternative: Deploy to Railway.app

Even easier - Railway auto-detects everything!

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway deploys both backend and frontend automatically!
6. Get your URLs from the Railway dashboard

---

## Alternative: Vercel (Frontend Only)

```bash
cd frontend
npm install -g vercel
vercel

# Follow prompts, then get your URL
```

For backend, use Render or Railway.

---

## Environment Variables (Optional)

If using Twilio for SMS:

**On Render:**
1. Go to your backend service
2. Click "Environment"
3. Add:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`

---

## Troubleshooting

### Backend won't start
- Check build logs on Render
- Verify `requirements.txt` is in backend folder
- Ensure start command is correct

### Frontend can't connect to backend
- Check CORS settings in `backend/main.py`
- Add your frontend URL to allowed origins
- Verify API_BASE_URL is correct

### Model file missing
- Run data generation and training locally
- Commit `fish_model.pkl` to git
- Push to GitHub

---

## Cost

**Render Free Tier:**
- ✅ Backend: Free (spins down after 15 min inactivity)
- ✅ Frontend: Free (always on)
- ⚠️ First request may be slow (cold start)

**Railway Free Tier:**
- ✅ $5 free credit per month
- ✅ Both services included

**Vercel Free Tier:**
- ✅ Unlimited frontend hosting
- ✅ Fast global CDN

---

## Share Your Project

Once deployed, share:
- 🌐 Live URL: `https://your-app.onrender.com`
- 💻 GitHub: `https://github.com/YOUR_USERNAME/fish-breeding-ai`
- 📹 Demo video: Upload to YouTube

Perfect for:
- Hackathon submissions
- Portfolio projects
- Job applications
- Sharing with friends/team

---

**Need help? Check the troubleshooting section or open an issue on GitHub!**
