# ⚡ Quick Start - 5 Minutes to Running App

## Windows Users - Copy & Paste These Commands

### Terminal 1: Setup & Start Backend

```powershell
# Navigate to project
cd fish-breeding-ai

# Generate data and train model
cd ml_pipeline
python generate_mock_data.py
python train_model.py

# Start backend
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Keep this terminal running!

### Terminal 2: Start Frontend

Open a NEW terminal window:

```powershell
# Navigate to frontend
cd fish-breeding-ai/frontend

# Install and start
npm install
npm run dev
```

Keep this terminal running!

### Open Browser

Navigate to: **http://localhost:5173**

## ✅ Success Checklist

- [ ] Terminal 1 shows: "Application startup complete"
- [ ] Terminal 2 shows: "Local: http://localhost:5173"
- [ ] Browser shows map with colored markers
- [ ] Can click markers to see details
- [ ] Can make predictions in right panel
- [ ] Can register farmers

## 🎯 Demo Flow

1. **Show Map**: "This displays real-time satellite data with AI-predicted breeding zones"
2. **Click Marker**: "Each zone shows environmental parameters and breeding probability"
3. **Make Prediction**: "Enter custom parameters to get instant AI predictions"
4. **Register Farmer**: "Farmers can register for SMS alerts when high zones are detected"
5. **Show Console**: "Backend logs all predictions and alerts"

## 🚨 Quick Fixes

**Port already in use?**
```powershell
# Backend - use different port
uvicorn main:app --reload --port 8001

# Update frontend API URL in src/App.jsx to http://localhost:8001
```

**Python not found?**
```powershell
# Try python3 instead
python3 generate_mock_data.py
```

**npm not found?**
- Install Node.js from: https://nodejs.org/

---

**Need help? Check README.md for detailed instructions**
