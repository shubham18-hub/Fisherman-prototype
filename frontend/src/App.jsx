import { useState, useEffect } from 'react'
import axios from 'axios'
import MapComponent from './components/MapComponent'
import FarmerRegistration from './components/FarmerRegistration'
import PredictionPanel from './components/PredictionPanel'
import './App.css'

const API_BASE_URL = 'http://localhost:8000'

function App() {
  const [satelliteData, setSatelliteData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Fetch satellite data from backend
  const fetchSatelliteData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/satellite-data`)
      setSatelliteData(response.data.data)
      setLastUpdate(new Date().toLocaleTimeString())
      setError(null)
      console.log('✅ Fetched satellite data:', response.data.count, 'points')
    } catch (err) {
      console.error('❌ Error fetching satellite data:', err)
      setError('Failed to fetch satellite data. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchSatelliteData()
  }, [])

  // Auto-refresh every 30 seconds (reduced from 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSatelliteData()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                🐟 AI Fish Breeding Zone Detection
              </h1>
              <p className="text-blue-100 mt-1">
                Real-time satellite monitoring for optimal breeding zones
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Last Update</div>
              <div className="text-lg font-semibold">{lastUpdate || 'Loading...'}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Status Bar */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {loading ? 'Updating...' : 'Live'}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {satelliteData.length} zones monitored
            </div>
          </div>
          <button
            onClick={fetchSatelliteData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            🔄 Refresh Now
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-xl font-bold text-gray-800">🗺️ Live Breeding Zone Map</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Color-coded zones: 🔴 High | 🟡 Medium | 🔵 Low breeding probability
                </p>
              </div>
              <div className="h-[500px]">
                {loading && satelliteData.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading map data...</p>
                    </div>
                  </div>
                ) : (
                  <MapComponent data={satelliteData} />
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3">📊 Breeding Probability Legend</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div>
                    <div className="text-sm font-medium">High (70-100%)</div>
                    <div className="text-xs text-gray-600">Optimal conditions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div>
                    <div className="text-sm font-medium">Medium (40-70%)</div>
                    <div className="text-xs text-gray-600">Moderate conditions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="text-sm font-medium">Low (0-40%)</div>
                    <div className="text-xs text-gray-600">Poor conditions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Prediction Panel */}
            <PredictionPanel />

            {/* Farmer Registration */}
            <FarmerRegistration />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            🌊 Powered by AI & Satellite Data | Built for Fishermen
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
