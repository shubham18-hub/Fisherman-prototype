# 📡 API Documentation

Base URL: `http://localhost:8000`

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/satellite-data` | Get satellite observations |
| POST | `/predict-zone` | Predict breeding probability |
| POST | `/farmer-register` | Register farmer |
| GET | `/farmers` | List registered farmers |
| POST | `/send-alert` | Send SMS alert |

---

## GET /

**Description:** Root endpoint with API information

**Response:**
```json
{
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
```

---

## GET /health

**Description:** Check API health status

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "data_loaded": true,
  "registered_farmers": 5
}
```

---

## GET /satellite-data

**Description:** Get 50 random satellite data points for map visualization

**Response:**
```json
{
  "count": 50,
  "data": [
    {
      "lat": 10.2345,
      "lon": 78.5678,
      "sea_surface_temperature": 28.5,
      "chlorophyll": 2.3,
      "turbidity": 5.1,
      "breeding_probability": 0.85,
      "date": "2026-03-10"
    }
  ]
}
```

**Usage Example:**
```javascript
const response = await axios.get('http://localhost:8000/satellite-data')
console.log(response.data.count) // 50
```

---

## POST /predict-zone

**Description:** Predict fish breeding probability using AI model

**Request Body:**
```json
{
  "temperature": 28.0,
  "chlorophyll": 2.5,
  "turbidity": 5.0
}
```

**Parameters:**
- `temperature` (float): Sea surface temperature in °C (20-35)
- `chlorophyll` (float): Chlorophyll concentration in mg/m³ (0-10)
- `turbidity` (float): Water turbidity in NTU (0-20)

**Response:**
```json
{
  "predicted_probability": 0.85,
  "risk_level": "HIGH",
  "recommendation": "🎯 Excellent breeding conditions! Deploy nets and monitor closely."
}
```

**Risk Levels:**
- `HIGH`: probability >= 0.7
- `MEDIUM`: 0.4 <= probability < 0.7
- `LOW`: probability < 0.4

**Usage Example:**
```javascript
const prediction = await axios.post('http://localhost:8000/predict-zone', {
  temperature: 28.0,
  chlorophyll: 2.5,
  turbidity: 5.0
})
console.log(prediction.data.predicted_probability) // 0.85
```

---

## POST /farmer-register

**Description:** Register a farmer for SMS alerts

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "location": "Coastal Village"
}
```

**Parameters:**
- `name` (string): Farmer's full name
- `phone` (string): Phone number with country code
- `location` (string): Village or city name

**Response:**
```json
{
  "success": true,
  "message": "Farmer John Doe registered successfully!",
  "farmer_id": 1,
  "total_farmers": 1
}
```

**Usage Example:**
```javascript
const result = await axios.post('http://localhost:8000/farmer-register', {
  name: 'John Doe',
  phone: '+1234567890',
  location: 'Coastal Village'
})
console.log(result.data.farmer_id) // 1
```

---

## GET /farmers

**Description:** Get list of all registered farmers

**Response:**
```json
{
  "count": 2,
  "farmers": [
    {
      "id": 1,
      "name": "John Doe",
      "phone": "+1234567890",
      "location": "Coastal Village",
      "registered_at": "2026-03-12T10:30:00"
    }
  ]
}
```

---

## POST /send-alert

**Description:** Send SMS alert to farmer

**Request Body:**
```json
{
  "phone": "+1234567890",
  "message": "High breeding zone detected near your location!",
  "breeding_probability": 0.85
}
```

**Parameters:**
- `phone` (string): Recipient phone number
- `message` (string): Alert message text
- `breeding_probability` (float): Probability value (0-1)

**Response (with Twilio):**
```json
{
  "success": true,
  "message": "SMS sent successfully",
  "sid": "SM1234567890abcdef",
  "method": "twilio"
}
```

**Response (console fallback):**
```json
{
  "success": true,
  "message": "Alert logged to console (Twilio not configured)",
  "method": "console",
  "details": {
    "phone": "+1234567890",
    "breeding_probability": 0.85
  }
}
```

---

## Error Responses

All endpoints return standard error responses:

**400 Bad Request:**
```json
{
  "detail": "Invalid input parameters"
}
```

**500 Internal Server Error:**
```json
{
  "detail": "ML model not loaded"
}
```

---

## CORS Configuration

Allowed origins:
- `http://localhost:5173`
- `http://127.0.0.1:5173`

All methods and headers are allowed for development.

---

## Testing with cURL

### Health Check
```bash
curl http://localhost:8000/health
```

### Get Satellite Data
```bash
curl http://localhost:8000/satellite-data
```

### Make Prediction
```bash
curl -X POST http://localhost:8000/predict-zone \
  -H "Content-Type: application/json" \
  -d '{"temperature": 28.0, "chlorophyll": 2.5, "turbidity": 5.0}'
```

### Register Farmer
```bash
curl -X POST http://localhost:8000/farmer-register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "phone": "+1234567890", "location": "Village"}'
```

### Send Alert
```bash
curl -X POST http://localhost:8000/send-alert \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890", "message": "Test alert", "breeding_probability": 0.85}'
```

---

## Rate Limits

Currently no rate limits (development mode).

For production, recommended limits:
- `/predict-zone`: 100 requests/minute
- `/send-alert`: 10 requests/minute
- Other endpoints: 1000 requests/minute

---

## Interactive Documentation

FastAPI provides automatic interactive documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These interfaces allow you to test all endpoints directly in the browser!

---

**API Version: 1.0.0**
**Last Updated: March 12, 2026**
