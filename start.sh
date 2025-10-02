#!/bin/bash
export FLASK_APP=server.app
# Build the React frontend
cd client
npm install
npm run build
cd ..
flask db upgrade
gunicorn server.app:app --bind 0.0.0.0:$PORT
