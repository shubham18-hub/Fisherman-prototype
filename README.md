# 🐟 AI Fish Breeding Zone Detection System

A full-stack hackathon prototype that predicts high fish breeding probability zones using AI and satellite data, with real-time map visualization and SMS alerts for farmers.

## 🎯 Features

- **AI-Powered Predictions**: RandomForest ML model trained on satellite environmental data
- **Live Map Dashboard**: Interactive map with color-coded breeding zones
- **Real-time Updates**: Auto-refresh satellite data every 5 seconds
- **SMS Alerts**: Twilio integration for farmer notifications
- **Manual Predictions**: Input custom environmental parameters
- **Farmer Registration**: Register farmers for automated alerts

## 🛠️ Tech Stack

### ML Pipeline
- Python, Pandas, NumPy, Scikit-Learn

### Backend
- FastAPI, Uvicorn, Joblib, Twilio

### Frontend
- React (Vite), Axios, React-Leaflet, TailwindCSS

## 📁 Project Structure

```
fish-breeding-ai/
├── backend/              # FastAPI backend
│   ├── main.py          # API endpoints
│   ├── fish_model.pkl   # Trained ML model (generated)
│   └── requirements.txt
├── frontend/            # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── MapComponent.jsx
│   │   │   ├── PredictionPanel.jsx
│   │   │   └── FarmerRegistration.jsx
│   │   └── main.jsx
│   └── package.json
├── ml_pipeline/         # ML training scripts
│   ├── generate_mock_data.py
│   └── train_model.py
└── data/               # Generated datasets
    └── satellite_mock.csv (generated)
```

## 🚀 Quick Start Guide

### Prerequisites

- Python 3.8+ installed
- Node.js 16+ and npm installed
- Terminal/Command Prompt

### Step 1: Generate Data & Train Model

```bash
# Navigate to ML pipeline directory
cd fish-breeding-ai/ml_pipeline

# Install Python dependencies (if needed)
pip install pandas numpy scikit-learn joblib

# Generate synthetic satellite data
python generate_mock_data.py

# Train the ML model
python train_model.py
```

**Expected Output:**
- `data/satellite_mock.csv` created (500 samples)
- `backend/fish_model.pkl` created (trained model)

### Step 2: Start Backend Server

```bash
# Navigate to backend directory
cd ../backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --port 8000
```

**Backend will run at:** `http://localhost:8000`

**Test it:** Open browser to `http://localhost:8000/health`

### Step 3: Start Frontend

Open a NEW terminal window:

```bash
# Navigate to frontend directory
cd fish-breeding-ai/frontend

# Install Node dependencies
npm install

# Start development server
npm run dev
```

**Frontend will run at:** `http://localhost:5173`

### Step 4: Open Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🎮 How to Use

### 1. View Live Map
- Map automatically loads 50 random satellite data points
- Color coding:
  - 🔴 Red = High breeding probability (>70%)
  - 🟡 Yellow = Medium probability (40-70%)
  - 🔵 Blue = Low probability (<40%)
- Click markers for detailed information

### 2. Make Predictions
- Use the "AI Prediction Tool" panel
- Enter environmental parameters:
  - Sea Surface Temperature (°C)
  - Chlorophyll concentration (mg/m³)
  - Turbidity (NTU)
- Click "Predict Breeding Zone"
- View probability and recommendations

### 3. Register Farmers
- Fill in farmer registration form
- Provide name, phone number, and location
- Receive welcome SMS alert (if Twilio configured)

## 📱 SMS Alerts (Optional)

### Without Twilio (Default)
- Alerts are logged to backend console
- Fully functional for demo purposes

### With Twilio (Production)
1. Sign up at [twilio.com](https://www.twilio.com)
2. Get Account SID, Auth Token, and Phone Number
3. Set environment variables:

**Windows (PowerShell):**
```powershell
$env:TWILIO_ACCOUNT_SID="your_account_sid"
$env:TWILIO_AUTH_TOKEN="your_auth_token"
$env:TWILIO_PHONE_NUMBER="+1234567890"
```

**Mac/Linux:**
```bash
export TWILIO_ACCOUNT_SID="your_account_sid"
export TWILIO_AUTH_TOKEN="your_auth_token"
export TWILIO_PHONE_NUMBER="+1234567890"
```

4. Restart backend server

## 🧪 Testing the System

### Test Backend Endpoints

```bash
# Health check
curl http://localhost:8000/health

# Get satellite data
curl http://localhost:8000/satellite-data

# Make prediction
curl -X POST http://localhost:8000/predict-zone \
  -H "Content-Type: application/json" \
  -d '{"temperature": 28.0, "chlorophyll": 2.5, "turbidity": 5.0}'

# Register farmer
curl -X POST http://localhost:8000/farmer-register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "phone": "+1234567890", "location": "Coastal Village"}'
```

### Test Frontend Features
1. ✅ Map loads with colored markers
2. ✅ Auto-refresh every 5 seconds
3. ✅ Click markers to see details
4. ✅ Make manual predictions
5. ✅ Register farmers
6. ✅ View console logs for alerts

## 🎨 Hackathon Demo Tips

1. **Start with the Story**: Explain the problem (fishermen need to know optimal breeding zones)
2. **Show the Data**: Display the map with color-coded zones
3. **Demonstrate AI**: Make a live prediction with different parameters
4. **Highlight Impact**: Register a farmer and show SMS alert (console log)
5. **Explain Tech**: Mention RandomForest, FastAPI, React, real-time updates

## 🐛 Troubleshooting

### Backend won't start
- Check Python version: `python --version` (need 3.8+)
- Install dependencies: `pip install -r requirements.txt`
- Check if port 8000 is available

### Frontend won't start
- Check Node version: `node --version` (need 16+)
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

### Map not loading
- Ensure backend is running at `http://localhost:8000`
- Check browser console for errors (F12)
- Verify CORS is enabled in backend

### Model not found
- Run `python train_model.py` in ml_pipeline directory
- Check that `backend/fish_model.pkl` exists

## 📊 Model Performance

The RandomForest model is trained on synthetic data with:
- **Features**: Sea surface temperature, chlorophyll, turbidity
- **Target**: Breeding probability (0-1)
- **Training samples**: 400
- **Test samples**: 100
- **Expected R² score**: >0.85

## 🔮 Future Enhancements

- Real satellite data integration (NASA, ESA APIs)
- Historical trend analysis
- Weather forecast integration
- Mobile app for farmers
- Multi-language support
- Advanced ML models (Neural Networks)
- Blockchain for data verification

## 👥 Team

Built for hackathon demonstration by AI Architect, Remote Sensing Scientist, and Full-Stack Engineering Lead.

## 📄 License

MIT License - Free for hackathon and educational use

## 🙏 Acknowledgments

- OpenStreetMap for map tiles
- Scikit-learn for ML framework
- FastAPI for backend framework
- React-Leaflet for map visualization

---

**🎉 Ready to demo! Good luck at the hackathon!**
