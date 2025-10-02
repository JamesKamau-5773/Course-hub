#!/bin/bash
export FLASK_APP=server.app
flask db upgrade
gunicorn server.app:app --bind 0.0.0.0:$PORT
