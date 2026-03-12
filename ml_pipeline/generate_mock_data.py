"""
Generate synthetic satellite data for fish breeding zone detection
Simulates real-world satellite observations with breeding probability rules
"""
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Set random seed for reproducibility
np.random.seed(42)

# Generate 500 synthetic satellite observations
n_samples = 500

# Define geographic bounds for coastal/ocean fishing zones
# Using Bay of Bengal and Arabian Sea coordinates (off Indian coast)
# These are realistic fishing zones in ocean waters

# Create multiple fishing zones
zones = [
    # Bay of Bengal (East coast)
    {'lat_range': (8.0, 13.0), 'lon_range': (80.5, 87.0), 'samples': 200},
    # Arabian Sea (West coast) 
    {'lat_range': (8.0, 15.0), 'lon_range': (72.0, 75.5), 'samples': 200},
    # Southern tip ocean zone
    {'lat_range': (6.0, 9.0), 'lon_range': (76.0, 80.0), 'samples': 100}
]

latitudes = []
longitudes = []

for zone in zones:
    lat_min, lat_max = zone['lat_range']
    lon_min, lon_max = zone['lon_range']
    n = zone['samples']
    
    latitudes.extend(np.random.uniform(lat_min, lat_max, n))
    longitudes.extend(np.random.uniform(lon_min, lon_max, n))

latitudes = np.array(latitudes)
longitudes = np.array(longitudes)

# Generate environmental parameters
# Sea Surface Temperature (°C) - typical range 24-32°C
sea_surface_temperature = np.random.uniform(24, 32, n_samples)

# Chlorophyll concentration (mg/m³) - indicator of phytoplankton
chlorophyll = np.random.uniform(0.1, 5.0, n_samples)

# Turbidity (NTU) - water clarity measure
turbidity = np.random.uniform(1, 15, n_samples)

# Generate dates over past 30 days
start_date = datetime.now() - timedelta(days=30)
dates = [start_date + timedelta(days=np.random.randint(0, 30)) for _ in range(n_samples)]

# Calculate breeding probability based on optimal conditions
# Optimal conditions for fish breeding:
# - Temperature: 26-30°C (higher probability)
# - Chlorophyll: 1.5-4.0 mg/m³ (food availability)
# - Turbidity: 2-8 NTU (moderate clarity)

breeding_probability = []

for i in range(n_samples):
    temp = sea_surface_temperature[i]
    chl = chlorophyll[i]
    turb = turbidity[i]
    
    # Temperature score (0-1)
    if 26 <= temp <= 30:
        temp_score = 1.0
    elif 24 <= temp < 26 or 30 < temp <= 32:
        temp_score = 0.5
    else:
        temp_score = 0.2
    
    # Chlorophyll score (0-1)
    if 1.5 <= chl <= 4.0:
        chl_score = 1.0
    elif 0.8 <= chl < 1.5 or 4.0 < chl <= 5.0:
        chl_score = 0.6
    else:
        chl_score = 0.3
    
    # Turbidity score (0-1)
    if 2 <= turb <= 8:
        turb_score = 1.0
    elif 1 <= turb < 2 or 8 < turb <= 10:
        turb_score = 0.5
    else:
        turb_score = 0.2
    
    # Combined probability with weights
    probability = (temp_score * 0.4 + chl_score * 0.35 + turb_score * 0.25)
    
    # Add some random noise
    probability += np.random.uniform(-0.1, 0.1)
    probability = np.clip(probability, 0, 1)
    
    breeding_probability.append(probability)

# Create DataFrame
data = pd.DataFrame({
    'lat': latitudes,
    'lon': longitudes,
    'sea_surface_temperature': sea_surface_temperature,
    'chlorophyll': chlorophyll,
    'turbidity': turbidity,
    'date': dates,
    'breeding_probability': breeding_probability
})

# Save to CSV
output_path = '../data/satellite_mock.csv'
data.to_csv(output_path, index=False)

print(f"✅ Generated {n_samples} synthetic satellite observations")
print(f"📁 Saved to: {output_path}")
print(f"\n📊 Data Summary:")
print(data.describe())
print(f"\n🎯 Breeding Probability Distribution:")
print(f"   High (>0.7): {len(data[data['breeding_probability'] > 0.7])} samples")
print(f"   Medium (0.4-0.7): {len(data[(data['breeding_probability'] >= 0.4) & (data['breeding_probability'] <= 0.7)])} samples")
print(f"   Low (<0.4): {len(data[data['breeding_probability'] < 0.4])} samples")
