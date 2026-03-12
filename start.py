#!/usr/bin/env python3
"""
Startup script for Render deployment
Simply starts the backend server (data and model are pre-generated)
"""
import os
import sys

print("=" * 50)
print("Starting Fish Breeding AI Backend")
print("=" * 50)

# Get port from environment
port = os.environ.get("PORT", "8000")

# Change to backend directory and start server
os.chdir("backend")

print(f"\nStarting server on port {port}...")
os.execvp("uvicorn", ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", port])

