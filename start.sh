#!/bin/bash

# Build frontend with correct API URL
echo "Building frontend with REACT_APP_API_URL=https://course-hub-2.onrender.com/api"
cd client
npm install
REACT_APP_API_URL=https://course-hub-2.onrender.com/api npm run build
cd ..

# Deploy backend with frontend build included
echo "Starting backend server"
source venv/bin/activate
python -m server.app
