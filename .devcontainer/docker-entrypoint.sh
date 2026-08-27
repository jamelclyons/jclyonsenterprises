#!/bin/bash
# docker-entrypoint.sh

set -e

cd /app

echo "Installing dependencies..."
npm install

echo "Starting development server..."
exec npm run dev