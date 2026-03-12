#!/usr/bin/env python3
"""
Startup script for Render deployment
Generates data, trains model, and starts the backend server
"""
import os
import sys
import subprocess

def run_command(cmd, cwd=None):
    """Run a shell command and handle errors"""
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    if result.returncode != 0:
        print(f"Error: Command failed with exit code {result.returncode}")
        sys.exit(result.returncode)
    return result

print("=" * 50)
print("Starting Fish Breeding AI System")
print("=" * 50)

# Step 1: Generate satellite data
print("\n[1/3] Generating satellite data...")
run_command("python generate_mock_data.py", cwd="ml_pipeline")

# Step 2: Train ML model
print("\n[2/3] Training ML model...")
run_command("python train_model.py", cwd="ml_pipeline")

# Step 3: Start backend server
print("\n[3/3] Starting backend server...")
port = os.environ.get("PORT", "8000")
os.chdir("backend")
os.execvp("uvicorn", ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", port])
