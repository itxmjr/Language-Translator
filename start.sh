#!/bin/bash

# Start Backend
cd backend
echo "Starting Backend..."
# Use uv to run uvicorn. It will automatically use the environment created by uv sync.
uv run uvicorn src.api:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

# Wait for backend to be ready (optional but good practice)
sleep 5

# Start Frontend
cd ../frontend
echo "Starting Frontend..."
npm run start -- -p 7860
