# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 🐍 Python Issues

#### Issue: "python: command not found"
**Symptoms:** Can't run Python scripts

**Solutions:**
1. Try `python3` instead of `python`
2. Check Python is installed: Download from https://python.org
3. Add Python to PATH (Windows: check "Add to PATH" during install)

#### Issue: "No module named 'pandas'"
**Symptoms:** Import errors when running scripts

**Solution:**
```bash
pip install pandas numpy scikit-learn joblib
# Or install all at once:
pip install -r backend/requirements.txt
```

#### Issue: Model training fails
**Symptoms:** Error during train_model.py

**Solutions:**
1. Ensure data file exists: Check `data/satellite_mock.csv`
2. Run data generation first: `python generate_mock_data.py`
3. Check Python version: Need 3.8 or higher

---

### 🚀 Backend Issues

#### Issue: "Port 8000 already in use"
**Symptoms:** Backend won't start

**Solutions:**
1. Use different port:
   ```bash
   uvicorn main:app --reload --port 8001
   ```
2. Update frontend API URL in `src/App.jsx`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8001'
   ```
3. Kill existing process (Windows):
   ```powershell
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   ```

#### Issue: "ML model not loaded"
**Symptoms:** Predictions fail with 500 error

**Solutions:**
1. Check model file exists: `backend/fish_model.pkl`
2. Train model: `python ml_pipeline/train_model.py`
3. Verify file path in backend/main.py

#### Issue: CORS errors
**Symptoms:** Frontend can't connect to backend

**Solutions:**
1. Verify backend is running on port 8000
2. Check CORS middleware in `backend/main.py`
3. Use exact URL: `http://localhost:5173` (not 127.0.0.1)

---

### ⚛️ Frontend Issues

#### Issue: "npm: command not found"
**Symptoms:** Can't run npm commands

**Solution:**
Install Node.js from https://nodejs.org (includes npm)

#### Issue: "Module not found" errors
**Symptoms:** Import errors in React

**Solutions:**
1. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
2. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

#### Issue: Map not displaying
**Symptoms:** Blank space where map should be

**Solutions:**
1. Check Leaflet CSS is loaded (in index.html)
2. Open browser console (F12) for errors
3. Verify backend is returning data:
   ```bash
   curl http://localhost:8000/satellite-data
   ```
4. Check MapComponent has height set

#### Issue: No markers on map
**Symptoms:** Map loads but no data points

**Solutions:**
1. Verify backend is running
2. Check browser console for API errors
3. Test API directly: `http://localhost:8000/satellite-data`
4. Check CORS configuration
5. Verify data file has content

#### Issue: "Failed to fetch"
**Symptoms:** API calls fail

**Solutions:**
1. Ensure backend is running on port 8000
2. Check API_BASE_URL in components
3. Verify CORS is enabled
4. Test with curl to isolate issue

---

### 🗺️ Map Issues

#### Issue: Markers wrong color
**Symptoms:** All markers same color

**Solution:**
Check `getColor()` function in MapComponent.jsx

#### Issue: Popups not showing
**Symptoms:** Click marker, nothing happens

**Solutions:**
1. Check Leaflet CSS is loaded
2. Verify Popup component is imported
3. Check browser console for errors

#### Issue: Map not centered
**Symptoms:** Map shows wrong location

**Solution:**
Adjust center coordinates in MapComponent.jsx:
```javascript
const defaultCenter = [10.0, 78.0] // [latitude, longitude]
```

---

### 📱 SMS/Twilio Issues

#### Issue: SMS not sending
**Symptoms:** No SMS received

**Expected Behavior:**
Without Twilio credentials, alerts log to console (this is normal!)

**To enable real SMS:**
1. Sign up at https://twilio.com
2. Get credentials from dashboard
3. Set environment variables:
   ```bash
   export TWILIO_ACCOUNT_SID="your_sid"
   export TWILIO_AUTH_TOKEN="your_token"
   export TWILIO_PHONE_NUMBER="+1234567890"
   ```
4. Restart backend

#### Issue: Twilio authentication failed
**Symptoms:** 401 error from Twilio

**Solutions:**
1. Verify credentials are correct
2. Check account is active
3. Verify phone number is verified in Twilio

---

### 🎨 UI/Styling Issues

#### Issue: Tailwind styles not working
**Symptoms:** Plain unstyled UI

**Solutions:**
1. Check tailwind.config.js exists
2. Verify postcss.config.js is present
3. Restart dev server: `npm run dev`
4. Check index.css imports Tailwind

#### Issue: Layout broken
**Symptoms:** Components overlapping or misaligned

**Solutions:**
1. Clear browser cache (Ctrl+Shift+R)
2. Check responsive classes in components
3. Verify container classes are correct

---

### 🔄 Data Issues

#### Issue: No data generated
**Symptoms:** CSV file empty or missing

**Solution:**
```bash
cd ml_pipeline
python generate_mock_data.py
# Check output: ../data/satellite_mock.csv
```

#### Issue: Predictions always same
**Symptoms:** Model returns constant value

**Solutions:**
1. Retrain model with fresh data
2. Check input parameters are varying
3. Verify model file is recent

---

### 🌐 Browser Issues

#### Issue: Page won't load
**Symptoms:** Blank page or loading forever

**Solutions:**
1. Check frontend dev server is running
2. Try different browser
3. Clear browser cache
4. Check browser console (F12) for errors
5. Try incognito/private mode

#### Issue: Console errors
**Symptoms:** Red errors in browser console

**Common Fixes:**
- Network errors → Check backend is running
- CORS errors → Verify CORS configuration
- Module errors → Reinstall dependencies
- React errors → Check component syntax

---

### 💻 Performance Issues

#### Issue: Slow predictions
**Symptoms:** Predictions take >5 seconds

**Solutions:**
1. Check CPU usage
2. Reduce model complexity (fewer trees)
3. Verify model is loaded once (not per request)

#### Issue: Map laggy
**Symptoms:** Slow map interactions

**Solutions:**
1. Reduce number of markers (change sample size)
2. Disable auto-refresh temporarily
3. Close other browser tabs
4. Check browser performance (F12 → Performance)

---

### 🔍 Debugging Tips

#### Enable Verbose Logging

**Backend:**
Add to main.py:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

**Frontend:**
Check browser console (F12) for logs

#### Test Components Individually

**Test Backend:**
```bash
curl http://localhost:8000/health
```

**Test Frontend:**
Open http://localhost:5173 and check console

**Test ML Pipeline:**
```bash
python -c "import joblib; model = joblib.load('backend/fish_model.pkl'); print('Model loaded!')"
```

#### Check File Paths

Verify these files exist:
- `data/satellite_mock.csv`
- `backend/fish_model.pkl`
- `frontend/node_modules/`
- `backend/__pycache__/` (created after first run)

---

### 🆘 Still Having Issues?

1. **Check all terminals** - Ensure both backend and frontend are running
2. **Restart everything** - Stop all servers, restart in order
3. **Fresh install** - Delete generated files and start over
4. **Check versions** - Python 3.8+, Node 16+
5. **Read error messages** - They usually tell you what's wrong!

---

### 📋 Quick Diagnostic Checklist

Run these commands to verify setup:

```bash
# Check Python
python --version

# Check Node
node --version

# Check data file
ls data/satellite_mock.csv

# Check model file
ls backend/fish_model.pkl

# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:5173
```

All should return success!

---

**Need more help? Check README.md for full documentation**
