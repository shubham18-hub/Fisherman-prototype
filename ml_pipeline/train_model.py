"""
Train RandomForest model for fish breeding zone prediction
Uses synthetic satellite data to learn optimal breeding conditions
"""
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

print("🚀 Starting model training pipeline...")

# Load dataset
data_path = '../data/satellite_mock.csv'
print(f"📂 Loading data from: {data_path}")
df = pd.read_csv(data_path)

print(f"✅ Loaded {len(df)} samples")

# Prepare features and target
# Features: environmental parameters
X = df[['sea_surface_temperature', 'chlorophyll', 'turbidity']]
# Target: breeding probability
y = df['breeding_probability']

print(f"\n📊 Feature columns: {list(X.columns)}")
print(f"🎯 Target: breeding_probability")

# Split data into training and testing sets (80-20 split)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\n🔀 Data split:")
print(f"   Training samples: {len(X_train)}")
print(f"   Testing samples: {len(X_test)}")

# Train RandomForest model
print(f"\n🌲 Training RandomForest model...")
model = RandomForestRegressor(
    n_estimators=100,        # Number of trees
    max_depth=10,            # Maximum tree depth
    min_samples_split=5,     # Minimum samples to split node
    min_samples_leaf=2,      # Minimum samples in leaf
    random_state=42,
    n_jobs=-1                # Use all CPU cores
)

model.fit(X_train, y_train)
print("✅ Model training complete!")

# Evaluate model performance
print(f"\n📈 Model Evaluation:")
y_pred_train = model.predict(X_train)
y_pred_test = model.predict(X_test)

train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
train_r2 = r2_score(y_train, y_pred_train)
test_r2 = r2_score(y_test, y_pred_test)

print(f"   Training RMSE: {train_rmse:.4f}")
print(f"   Testing RMSE: {test_rmse:.4f}")
print(f"   Training R²: {train_r2:.4f}")
print(f"   Testing R²: {test_r2:.4f}")

# Feature importance
print(f"\n🔍 Feature Importance:")
for feature, importance in zip(X.columns, model.feature_importances_):
    print(f"   {feature}: {importance:.4f}")

# Save model
model_path = '../backend/fish_model.pkl'
joblib.dump(model, model_path)
print(f"\n💾 Model saved to: {model_path}")

# Test prediction with sample data
print(f"\n🧪 Testing sample predictions:")
test_samples = [
    {'temp': 28.0, 'chl': 2.5, 'turb': 5.0, 'desc': 'Optimal conditions'},
    {'temp': 25.0, 'chl': 1.0, 'turb': 12.0, 'desc': 'Suboptimal conditions'},
    {'temp': 29.0, 'chl': 3.5, 'turb': 4.0, 'desc': 'Good conditions'}
]

for sample in test_samples:
    prediction = model.predict([[sample['temp'], sample['chl'], sample['turb']]])[0]
    print(f"   {sample['desc']}: {prediction:.3f}")

print(f"\n✨ Model training pipeline complete!")
print(f"🎯 Ready for deployment in FastAPI backend")
