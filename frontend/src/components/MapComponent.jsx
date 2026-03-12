import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

/**
 * MapComponent - Displays satellite data points on interactive map
 * Color codes zones based on breeding probability
 */
function MapComponent({ data }) {
  // Default center (Indian Ocean / Bay of Bengal region)
  const defaultCenter = [10.5, 79.0]
  const defaultZoom = 7

  // Calculate map center from data
  const mapCenter = data.length > 0
    ? [
        data.reduce((sum, point) => sum + point.lat, 0) / data.length,
        data.reduce((sum, point) => sum + point.lon, 0) / data.length
      ]
    : defaultCenter

  /**
   * Get color based on breeding probability
   * Red: High probability (>0.7)
   * Yellow: Medium probability (0.4-0.7)
   * Blue: Low probability (<0.4)
   */
  const getColor = (probability) => {
    if (probability >= 0.7) return '#ef4444' // Red
    if (probability >= 0.4) return '#eab308' // Yellow
    return '#3b82f6' // Blue
  }

  /**
   * Get risk level text
   */
  const getRiskLevel = (probability) => {
    if (probability >= 0.7) return 'HIGH'
    if (probability >= 0.4) return 'MEDIUM'
    return 'LOW'
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
    >
      {/* Base map tiles from OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render data points as circle markers */}
      {data.map((point, index) => {
        const color = getColor(point.breeding_probability)
        const riskLevel = getRiskLevel(point.breeding_probability)

        return (
          <CircleMarker
            key={index}
            center={[point.lat, point.lon]}
            radius={8}
            fillColor={color}
            color={color}
            weight={2}
            opacity={0.8}
            fillOpacity={0.6}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold text-lg mb-2">
                  🐟 Breeding Zone {index + 1}
                </h3>
                <div className="space-y-1">
                  <div>
                    <strong>Probability:</strong>{' '}
                    <span className="font-semibold" style={{ color }}>
                      {(point.breeding_probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <strong>Risk Level:</strong>{' '}
                    <span className="font-semibold" style={{ color }}>
                      {riskLevel}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div>
                    <strong>🌡️ Temperature:</strong> {point.sea_surface_temperature.toFixed(1)}°C
                  </div>
                  <div>
                    <strong>🌿 Chlorophyll:</strong> {point.chlorophyll.toFixed(2)} mg/m³
                  </div>
                  <div>
                    <strong>💧 Turbidity:</strong> {point.turbidity.toFixed(1)} NTU
                  </div>
                  <hr className="my-2" />
                  <div className="text-xs text-gray-600">
                    📍 {point.lat.toFixed(4)}, {point.lon.toFixed(4)}
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

export default MapComponent
