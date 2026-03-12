"""
FastAPI Backend for AI Fish Breeding Zone Detection System
Provides REST API endpoints for predictions, data retrieval, and SMS alerts
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os
from typing import List, Dict
import random

# Initialize FastAPI app
app = FastAPI(
    title="Fish Breeding Zone Detection API",
    description="AI-powered fish breeding probability prediction system",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model
MODEL_PATH = "fish_model.pkl"
DATA_PATH = "../data/satellite_mock.csv"

try:
    model = joblib.load(MODEL_PATH)
    print("✅ ML Model loaded successfully")
except Exception as e:
    print(f"⚠️ Warning: Could not load model - {e}")
    model = None

try:
    satellite_data = pd.read_csv(DATA_PATH)
    print(f"✅ Loaded {len(satellite_data)} satellite data points")
except Exception as e:
    print(f"⚠️ Warning: Could not load data - {e}")
    satellite_data = None

# In-memory storage for farmers (hackathon MVP)
farmers_db = []

# Cache for satellite data to prevent constant changes
cached_satellite_sample = None
cache_timestamp = None
CACHE_DURATION = 300  # Cache for 5 minutes (300 seconds)

# Pydantic models for request/response validation
class PredictionInput(BaseModel):
    temperature: float
    chlorophyll: float
    turbidity: float

class PredictionOutput(BaseModel):
    predicted_probability: float
    risk_level: str
    recommendation: str

class FarmerRegistration(BaseModel):
    name: str
    phone: str
    location: str

class AlertRequest(BaseModel):
    phone: str
    message: str
    breeding_probability: float

# ============================================
# API ENDPOINTS
# ============================================

@app.get("/")
async def root():
    """Root endpoint - API information"""
    return {
        "message": "🐟 Fish Breeding Zone Detection API",
        "status": "operational",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "satellite_data": "/satellite-data",
            "predict": "/predict-zone",
            "register": "/farmer-register",
            "alert": "/send-alert"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "data_loaded": satellite_data is not None,
        "registered_farmers": len(farmers_db)
    }

@app.get("/satellite-data")
async def get_satellite_data():
    """
    Get 50 satellite data points for map visualization
    Returns cached data to prevent markers from jumping around
    Cache refreshes every 5 minutes
    """
    global cached_satellite_sample, cache_timestamp
    
    if satellite_data is None:
        raise HTTPException(status_code=500, detail="Satellite data not loaded")
    
    # Check if cache is valid
    current_time = pd.Timestamp.now()
    if cached_satellite_sample is None or cache_timestamp is None or \
       (current_time - cache_timestamp).total_seconds() > CACHE_DURATION:
        
        # Sample 50 random points and cache them
        sample_size = min(50, len(satellite_data))
        cached_satellite_sample = satellite_data.sample(n=sample_size, random_state=42)
        cache_timestamp = current_time
        print(f"🔄 Refreshed satellite data cache at {current_time}")
    
    # Convert cached data to list of dictionaries
    data_points = []
    for _, row in cached_satellite_sample.iterrows():
        data_points.append({
            "lat": float(row['lat']),
            "lon": float(row['lon']),
            "sea_surface_temperature": float(row['sea_surface_temperature']),
            "chlorophyll": float(row['chlorophyll']),
            "turbidity": float(row['turbidity']),
            "breeding_probability": float(row['breeding_probability']),
            "date": str(row['date'])
        })
    
    return {
        "count": len(data_points),
        "data": data_points,
        "cached_at": cache_timestamp.isoformat() if cache_timestamp else None
    }

@app.post("/predict-zone", response_model=PredictionOutput)
async def predict_breeding_zone(input_data: PredictionInput):
    """
    Predict fish breeding probability based on environmental parameters
    Uses trained RandomForest model
    """
    if model is None:
        raise HTTPException(status_code=500, detail="ML model not loaded")
    
    try:
        # Prepare input features
        features = [[
            input_data.temperature,
            input_data.chlorophyll,
            input_data.turbidity
        ]]
        
        # Make prediction
        prediction = model.predict(features)[0]
        prediction = float(max(0.0, min(1.0, prediction)))  # Clip to [0, 1]
        
        # Determine risk level and recommendation
        if prediction >= 0.7:
            risk_level = "HIGH"
            recommendation = "🎯 Excellent breeding conditions! Deploy nets and monitor closely."
        elif prediction >= 0.4:
            risk_level = "MEDIUM"
            recommendation = "⚠️ Moderate conditions. Consider selective deployment."
        else:
            risk_level = "LOW"
            recommendation = "❌ Poor breeding conditions. Wait for better parameters."
        
        print(f"🔮 Prediction made: {prediction:.3f} ({risk_level})")
        
        return PredictionOutput(
            predicted_probability=prediction,
            risk_level=risk_level,
            recommendation=recommendation
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/farmer-register")
async def register_farmer(farmer: FarmerRegistration):
    """
    Register a farmer for SMS alerts
    Stores farmer information in memory (hackathon MVP)
    """
    farmer_data = {
        "id": len(farmers_db) + 1,
        "name": farmer.name,
        "phone": farmer.phone,
        "location": farmer.location,
        "registered_at": pd.Timestamp.now().isoformat()
    }
    
    farmers_db.append(farmer_data)
    
    print(f"👨‍🌾 New farmer registered: {farmer.name} ({farmer.phone})")
    
    return {
        "success": True,
        "message": f"Farmer {farmer.name} registered successfully!",
        "farmer_id": farmer_data["id"],
        "total_farmers": len(farmers_db)
    }

@app.get("/farmers")
async def get_farmers():
    """Get list of registered farmers"""
    return {
        "count": len(farmers_db),
        "farmers": farmers_db
    }

@app.post("/refresh-data")
async def refresh_satellite_data():
    """
    Manually refresh the satellite data cache
    Useful for demos to show "new" data
    """
    global cached_satellite_sample, cache_timestamp
    
    if satellite_data is None:
        raise HTTPException(status_code=500, detail="Satellite data not loaded")
    
    # Force refresh by clearing cache
    sample_size = min(50, len(satellite_data))
    cached_satellite_sample = satellite_data.sample(n=sample_size)
    cache_timestamp = pd.Timestamp.now()
    
    print(f"🔄 Manual refresh triggered at {cache_timestamp}")
    
    return {
        "success": True,
        "message": "Satellite data refreshed",
        "timestamp": cache_timestamp.isoformat(),
        "points": len(cached_satellite_sample)
    }

@app.post("/send-alert")
async def send_sms_alert(alert: AlertRequest):
    """
    Send SMS alert to farmer using Twilio
    Falls back to console logging if Twilio credentials not configured
    """
    try:
        # Try to import Twilio
        from twilio.rest import Client
        
        # Get Twilio credentials from environment
        account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        twilio_phone = os.getenv('TWILIO_PHONE_NUMBER')
        
        if account_sid and auth_token and twilio_phone:
            # Send real SMS
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                body=alert.message,
                from_=twilio_phone,
                to=alert.phone
            )
            
            print(f"📱 SMS sent to {alert.phone}: {message.sid}")
            
            return {
                "success": True,
                "message": "SMS sent successfully",
                "sid": message.sid,
                "method": "twilio"
            }
        else:
            # Fallback: Console logging
            print(f"\n📱 SMS ALERT (Console Fallback)")
            print(f"   To: {alert.phone}")
            print(f"   Message: {alert.message}")
            print(f"   Breeding Probability: {alert.breeding_probability:.2%}")
            print(f"   ⚠️ Twilio credentials not configured - using console logging\n")
            
            return {
                "success": True,
                "message": "Alert logged to console (Twilio not configured)",
                "method": "console",
                "details": {
                    "phone": alert.phone,
                    "breeding_probability": alert.breeding_probability
                }
            }
    
    except ImportError:
        # Twilio not installed - console fallback
        print(f"\n📱 SMS ALERT (Console Fallback)")
        print(f"   To: {alert.phone}")
        print(f"   Message: {alert.message}")
        print(f"   Breeding Probability: {alert.breeding_probability:.2%}")
        print(f"   ⚠️ Twilio not installed - using console logging\n")
        
        return {
            "success": True,
            "message": "Alert logged to console (Twilio not installed)",
            "method": "console"
        }
    
    except Exception as e:
        print(f"❌ Error sending alert: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Alert error: {str(e)}")

# Run with: uvicorn main:app --reload --port 8000
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
