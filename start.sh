#!/bin/bash
export FLASK_APP=server.app
# Set default PORT if not set
export PORT=${PORT:-5002}
# Install PostgreSQL development packages for pg_config
apt-get update && apt-get install -y libpq-dev
# Build the React frontend
cd client
npm install
npm run build
cd ..
flask db upgrade
gunicorn server.app:app --bind 0.0.0.0:$PORT
