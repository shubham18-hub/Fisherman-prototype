#!/usr/bin/env bash
set -e

echo "Generating satellite data..."
python ml_pipeline/generate_mock_data.py

echo "Training ML model..."
python ml_pipeline/train_model.py

echo "Starting backend server..."
cd backend && uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
