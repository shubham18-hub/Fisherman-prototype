import { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'https://fisherman-prototype.onrender.com'

/**
 * FarmerRegistration - Register farmers for SMS alerts
 * Collects farmer information and enables alert notifications
 */
function FarmerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: ''
  })
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      console.log('👨‍🌾 Registering farmer:', formData)
      
      const response = await axios.post(`${API_BASE_URL}/farmer-register`, formData)
      setSuccess(response.data.message)
      
      console.log('✅ Farmer registered:', response.data)

      // Clear form
      setFormData({
        name: '',
        phone: '',
        location: ''
      })

      // Send test alert
      if (formData.phone) {
        setTimeout(() => {
          sendTestAlert(formData.phone)
        }, 1000)
      }
    } catch (err) {
      console.error('❌ Registration error:', err)
      setError('Failed to register farmer. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const sendTestAlert = async (phone) => {
    try {
      const alertData = {
        phone: phone,
        message: '🐟 Welcome to Fish Breeding Alert System! You will receive notifications when high breeding zones are detected.',
        breeding_probability: 0.85
      }

      console.log('📱 Sending welcome alert to:', phone)
      
      const response = await axios.post(`${API_BASE_URL}/send-alert`, alertData)
      console.log('✅ Alert sent:', response.data)
    } catch (err) {
      console.error('⚠️ Alert sending failed:', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        👨‍🌾 Farmer Registration
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Register to receive SMS alerts for high breeding zones
      </p>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 1234567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Include country code</p>
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Village/City name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Registering...' : '📝 Register for Alerts'}
        </button>
      </form>

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          ✅ {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          ❌ {error}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          📱 SMS Alert Features
        </h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Real-time notifications for high breeding zones</li>
          <li>• Location-specific alerts</li>
          <li>• Environmental parameter updates</li>
          <li>• Best fishing time recommendations</li>
        </ul>
      </div>
    </div>
  )
}

export default FarmerRegistration
