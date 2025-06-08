#!/bin/bash
cd /home/youruser/your-project

echo "Pulling latest code..."
git pull origin main

echo "Deploying with docker-compose..."
docker-compose down
docker-compose up -d --build
