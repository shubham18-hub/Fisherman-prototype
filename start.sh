#!/bin/bash

# Generate data and train model
cd ml_pipeline
python generate_mock_data.py
python train_model.py

# Start backend server
cd ../backend
uvicorn main:app --host 0.0.0.0 --port $PORT
