# 🪟 Windows Setup Guide - Step by Step

## Prerequisites Check

Open PowerShell and verify:

```powershell
# Check Python (need 3.8+)
python --version

# Check Node.js (need 16+)
node --version

# Check npm
npm --version
```

If any are missing:
- Python: Download from https://www.python.org/downloads/
- Node.js: Download from https://nodejs.org/

## Step-by-Step Setup

### 1️⃣ Generate Data & Train Model (5 minutes)

```powershell
# Navigate to project
cd fish-breeding-ai\ml_pipeline

# Generate synthetic satellite data
python generate_mock_data.py
```

**Expected output:**
```
✅ Generated 500 synthetic satellite observations
📁 Saved to: ../data/satellite_mock.csv
```

```powershell
# Train the AI model
python train_model.py
```

**Expected output:**
```
✅ Model training complete!
💾 Model saved to: ../backend/fish_model.pkl
```

### 2️⃣ Start Backend Server (2 minutes)

```powershell
# Navigate to backend
cd ..\backend

# Install Python packages
pip install -r requirements.txt
```

**This installs:** FastAPI, Uvicorn, Pandas, NumPy, Scikit-Learn, Joblib, Twilio

```powershell
# Start the server
uvicorn main:app --reload --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

✅ **Keep this terminal window open!**

### 3️⃣ Start Frontend (3 minutes)

Open a **NEW PowerShell window**:

```powershell
# Navigate to frontend
cd fish-breeding-ai\frontend

# Install Node packages (first time only)
npm install
```

**This installs:** React, Vite, Axios, React-Leaflet, TailwindCSS

```powershell
# Start development server
npm run dev
```

**Expected output:**
```
  VITE v5.0.11  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **Keep this terminal window open!**

### 4️⃣ Open Application

Open your browser and go to:
```
http://localhost:5173
```

## ✅ Verification Steps

1. **Map loads** with colored markers (red, yellow, blue)
2. **Click a marker** - popup shows details
3. **Right panel** shows "AI Prediction Tool"
4. **Bottom right** shows "Farmer Registration"
5. **No errors** in browser console (press F12)

## 🧪 Test the Features

### Test 1: View Satellite Data
- Map should show ~50 markers
- Colors: Red (high), Yellow (medium), Blue (low)
- Click any marker to see details

### Test 2: Make a Prediction
1. In "AI Prediction Tool" panel, enter:
   - Temperature: 28.0
   - Chlorophyll: 2.5
   - Turbidity: 5.0
2. Click "Predict Breeding Zone"
3. Should show ~85% probability (HIGH RISK)

### Test 3: Register a Farmer
1. In "Farmer Registration" panel, enter:
   - Name: Test Farmer
   - Phone: +1234567890
   - Location: Test Village
2. Click "Register for Alerts"
3. Should show success message
4. Check backend terminal - should see registration log

## 🚨 Common Issues & Fixes

### Issue: "python: command not found"
**Fix:** Try `python3` instead of `python`

### Issue: "Port 8000 already in use"
**Fix:** Use different port:
```powershell
uvicorn main:app --reload --port 8001
```
Then update frontend: Edit `src/App.jsx` and change:
```javascript
const API_BASE_URL = 'http://localhost:8001'
```

### Issue: "npm: command not found"
**Fix:** Install Node.js from https://nodejs.org/

### Issue: Map shows but no markers
**Fix:** 
1. Check backend is running (terminal 1)
2. Open browser console (F12)
3. Look for CORS or network errors
4. Verify backend URL is correct

### Issue: "Module not found" errors
**Fix:**
```powershell
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

## 📱 Optional: Configure SMS Alerts

If you want real SMS (not required for demo):

1. Sign up at https://www.twilio.com
2. Get credentials from dashboard
3. Set environment variables:

```powershell
$env:TWILIO_ACCOUNT_SID="your_sid_here"
$env:TWILIO_AUTH_TOKEN="your_token_here"
$env:TWILIO_PHONE_NUMBER="+1234567890"
```

4. Restart backend server

**Note:** Without Twilio, alerts are logged to console (perfectly fine for demos!)

## 🎯 Ready for Demo!

You should now have:
- ✅ Backend running on http://localhost:8000
- ✅ Frontend running on http://localhost:5173
- ✅ Map displaying with colored markers
- ✅ Prediction tool working
- ✅ Registration form working

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick commands
- `TESTING_CHECKLIST.md` - Verify everything works
- `DEMO_SCRIPT.md` - Presentation guide

---

**🎉 You're all set! Time to win that hackathon!**
