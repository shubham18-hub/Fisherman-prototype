import { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

/**
 * PredictionPanel - Manual prediction interface
 * Allows users to input environmental parameters and get AI predictions
 */
function PredictionPanel() {
  const [formData, setFormData] = useState({
    temperature: 28.0,
    chlorophyll: 2.5,
    turbidity: 5.0
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }))
  }

  const handlePredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      console.log('🔮 Making prediction with:', formData)
      
      const response = await axios.post(`${API_BASE_URL}/predict-zone`, formData)
      setPrediction(response.data)
      
      console.log('✅ Prediction result:', response.data)

      // If high probability, trigger alert
      if (response.data.predicted_probability >= 0.7) {
        console.log('🚨 High breeding probability detected! Triggering alert...')
      }
    } catch (err) {
      console.error('❌ Prediction error:', err)
      setError('Failed to get prediction. Check backend connection.')
    } finally {
      setLoading(false)
    }
  }

  const getColorClass = (probability) => {
    if (probability >= 0.7) return 'text-red-600 bg-red-50'
    if (probability >= 0.4) return 'text-yellow-600 bg-yellow-50'
    return 'text-blue-600 bg-blue-50'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        🔮 AI Prediction Tool
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Enter environmental parameters to predict breeding probability
      </p>

      <form onSubmit={handlePredict} className="space-y-4">
        {/* Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🌡️ Sea Surface Temperature (°C)
          </label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            step="0.1"
            min="20"
            max="35"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Optimal: 26-30°C</p>
        </div>

        {/* Chlorophyll Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🌿 Chlorophyll (mg/m³)
          </label>
          <input
            type="number"
            name="chlorophyll"
            value={formData.chlorophyll}
            onChange={handleInputChange}
            step="0.1"
            min="0"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Optimal: 1.5-4.0 mg/m³</p>
        </div>

        {/* Turbidity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            💧 Turbidity (NTU)
          </label>
          <input
            type="number"
            name="turbidity"
            value={formData.turbidity}
            onChange={handleInputChange}
            step="0.1"
            min="0"
            max="20"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Optimal: 2-8 NTU</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '🔄 Predicting...' : '🎯 Predict Breeding Zone'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-6 space-y-3">
          <div className={`p-4 rounded-lg ${getColorClass(prediction.predicted_probability)}`}>
            <div className="text-sm font-medium mb-1">Breeding Probability</div>
            <div className="text-3xl font-bold">
              {(prediction.predicted_probability * 100).toFixed(1)}%
            </div>
            <div className="text-sm font-semibold mt-1">
              {prediction.risk_level} RISK
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-2">
              💡 Recommendation
            </div>
            <p className="text-sm text-gray-600">
              {prediction.recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PredictionPanel
