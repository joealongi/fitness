#!/bin/bash

# Airwave Deployment Script
# This script helps deploy Airwave to Railway

echo "🚀 Starting Airwave deployment..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (user needs to authenticate manually)
echo "🔐 Please login to Railway:"
railway login

# Create new Railway project
echo "📦 Creating Railway project..."
railway init airwave-fitness

# Link to the project
railway link

# Deploy backend
echo "🐍 Deploying backend..."
cd backend

# Create Railway configuration
cat > railway.toml << EOF
[build]
builder = "NIXPACKS"

[deploy]
healthcheckPath = "/api/health/"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[build.env]
PYTHON_VERSION = "3.11"
EOF

# Set environment variables
railway variables set DJANGO_SETTINGS_MODULE=fitness_backend.settings
railway variables set DEBUG=False
railway variables set SECRET_KEY=$(openssl rand -hex 32)

# Deploy
railway up

echo "✅ Backend deployed successfully!"

# Deploy frontend
echo "⚛️ Deploying frontend..."
cd ../frontend

# Build for production
npm run build

# Create vercel.json for deployment
cat > vercel.json << EOF
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "angular",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "http://localhost:8000/api/$1" }
  ]
}
EOF

# Deploy to Vercel
npx vercel --prod

echo "🎉 Airwave deployment complete!"
echo "🌐 Frontend: Check Vercel dashboard for URL"
echo "🔗 Backend: Check Railway dashboard for URL"
echo ""
echo "Remember to:"
echo "1. Update frontend API base URL to production backend URL"
echo "2. Set up proper CORS settings"
echo "3. Configure database (Railway provides PostgreSQL)"
echo "4. Run migrations: railway run python manage.py migrate"
