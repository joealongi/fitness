# Airwave - AI-Powered Fitness Tracker

Airwave is a comprehensive fitness application that estimates VO2 max from workout data and provides personalized health insights. Built with cutting-edge AI technologies including Spiking Neural Networks (Norse) and vector databases (ChromaDB), Airwave offers advanced fitness analytics beyond traditional trackers.

## 🚀 Features

- **VO2 Max Estimation**: Calculate aerobic fitness using multiple scientific methods
- **Real-time Workout Logging**: Track runs, cycles, and other activities
- **AI-Powered Insights**: Norse SNN for temporal data analysis
- **Vector-Based Storage**: ChromaDB for efficient fitness data management
- **MCP Integration**: External AI tools for enhanced fitness guidance
- **Personalized Benefits**: Health insights based on your fitness metrics

## 🛠️ Tech Stack

### Frontend

- **Angular 21**: Latest modern reactive web framework
- **TypeScript**: Type-safe development
- **Spartan CSS**: Custom utility-first CSS framework inspired by modern design principles
- **Responsive Design**: Mobile-first approach with clean, accessible components

### Backend

- **Django 6.0**: Robust web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Production database
- **PyTorch**: Machine learning framework
- **Norse**: Spiking Neural Networks library
- **ChromaDB**: Vector database for embeddings

### AI & External Tools

- **MCP (Model Context Protocol)**: External AI tool integration
- **Scientific Formulas**: Cooper test, heart rate-based calculations

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                               Airwave Fitness                              │
│                        AI-Powered VO2 Max Calculator                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            User Interface Layer                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   Angular 21    │  │   Spartan UI    │  │   PWA Ready     │            │
│  │   Frontend      │  │   Components    │  │   Manifest      │            │
│  │   TypeScript    │  │   Responsive    │  │   Offline       │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
│                                                                             │
│  🎨 SEO Optimized • 📱 Mobile First • ⚡ Fast Loading                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           API Gateway Layer                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   Django REST   │  │   JWT Auth      │  │   CORS Config   │            │
│  │   Framework     │  │   User Mgmt     │  │   Rate Limiting │            │
│  │   API Endpoints │  │   Sessions      │  │   Security      │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
│                                                                             │
│  🔐 Encrypted Data • 🛡️ Security Headers • 📊 API Analytics               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          Business Logic Layer                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   VO2 Max       │  │   Workout       │  │   User Profile  │            │
│  │   Calculations  │  │   Processing    │  │   Management    │            │
│  │   Cooper Test   │  │   Data Storage  │  │   Health Data   │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
│                                                                             │
│  🧮 Scientific Formulas • 📈 Progress Tracking • 👤 User Analytics         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                             AI Processing Layer                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   Norse SNN     │  │   PyTorch       │  │   MCP Protocol  │            │
│  │   Neural Nets   │  │   ML Models     │  │   AI Tools      │            │
│  │   Temporal      │  │   Inference     │  │   External APIs │            │
│  │   Processing    │  │   Engine        │  │   Integration   │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
│                                                                             │
│  🧠 Spiking Networks • 🔬 Advanced Analytics • 🤖 AI Insights             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            Data Storage Layer                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   PostgreSQL    │  │   ChromaDB      │  │   Encrypted     │            │
│  │   Relational    │  │   Vector DB     │  │   Fields        │            │
│  │   User Data     │  │   Embeddings    │  │   AES-256       │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
│                                                                             │
│  🗄️ Structured Data • 🔍 Semantic Search • 🔒 Data Protection             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          External Services Layer                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   Stripe        │  │   Railway       │  │   Railway MCP   │            │
│  │   Payments      │  │   Hosting       │  │   Server        │            │
│  │   Subscriptions │  │   PostgreSQL    │  │   AI Tools      │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
│                                                                             │
│  💳 Monetization • 🚀 Deployment • 🧠 AI Enhancement                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              Data Flow Diagram                              │
└─────────────────────────────────────────────────────────────────────────────┘

User Request → Angular SPA → Django API → Business Logic → AI Processing
                      ↓                     ↓                   ↓
                SEO/PWA Response    ←   Database Query   ←   ML Inference
                      ↑                     ↑                   ↑
                Browser Cache    ←   Cache Layer      ←   Model Cache

┌─────────────────────────────────────────────────────────────────────────────┐
│                            Security Architecture                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  🔐 HTTPS/TLS • 🛡️ Django Security • 🔒 Field Encryption                   │
│  🚪 CORS Protection • 📊 Rate Limiting • 🔑 JWT Authentication             │
│  📋 Input Validation • 🧹 Data Sanitization • 📝 Audit Logging             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📋 Prerequisites

- Node.js 22+ (LTS)
- Python 3.11+
- PostgreSQL (for production)
- Git

## 🔧 Installation

### Backend Setup

1. **Clone and navigate to backend:**

```bash
cd backend
```

2. **Create virtual environment:**

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**

```bash
pip install -r requirements.txt
```

4. **Database setup:**

```bash
python manage.py migrate
python manage.py createsuperuser
```

5. **Run development server:**

```bash
python manage.py runserver
```

### Frontend Setup

1. **Navigate to frontend:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run development server:**

```bash
npm start
```

### MCP Server Setup

1. **Navigate to MCP server:**

```bash
cd mcp-airwave
```

2. **Install dependencies:**

```bash
npm install
```

3. **Build the server:**

```bash
npm run build
```

## 🚀 Usage

### Getting Started

1. **Start the Backend:**

   ```bash
   cd backend && source venv/bin/activate && python manage.py runserver
   ```

2. **Start the Frontend:**

   ```bash
   cd frontend && npm start
   ```

3. **Open your browser** to `http://localhost:4200`

### Logging Workouts

1. **Fill out the workout form:**

   - Activity type (🏃 Run, 🚴 Cycle, 🚶 Walk)
   - Duration in minutes
   - Distance in kilometers
   - Heart rate data (optional)
   - Intensity level

2. **Click "🚀 Log Workout"**

3. **View your results:**
   - Estimated VO2 max with gradient display
   - Personalized health benefits
   - System status indicators
   - AI feature highlights

### Spartan UI Features

- **Clean Design**: Minimal, accessible interface following modern design principles
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Status Indicators**: Real-time connection status for backend and AI services
- **Gradient Accents**: Beautiful color gradients for visual hierarchy
- **Card-based Layout**: Organized content in clean, shadow-bordered cards
- **Interactive Elements**: Hover effects and smooth transitions

### API Endpoints

#### Health Check

```
GET /api/health/
```

Returns application status.

#### Norse SNN Test

```
GET /api/norse-test/
```

Tests Norse SNN integration.

#### Workout Management

```
POST /api/workouts/
```

Log a new workout and get VO2 max estimate.

**Request Body:**

```json
{
  "activity_type": "run",
  "duration": 30,
  "distance": 5.0,
  "heart_rate_avg": 150,
  "heart_rate_max": 180,
  "intensity": "moderate"
}
```

**Response:**

```json
{
  "workout": {...},
  "vo2max_estimate": 42.5,
  "benefits": "Good aerobic fitness level..."
}
```

#### ChromaDB Test

```
GET /api/chroma-test/
```

Test vector database functionality.

#### Norse VO2 Analysis

```
POST /api/norse-vo2/
```

Advanced VO2 max estimation using SNN.

## 💳 Stripe Payment Integration

Airwave includes premium subscription features powered by Stripe:

### Subscription Plans

- **Free**: Basic VO2 max calculations, limited workouts
- **Premium** ($9.99/month): Advanced AI insights, unlimited workouts, priority support
- **Pro** ($19.99/month): All Premium features + custom workout plans, nutrition tracking, progress analytics

### Payment Features

- ✅ **Secure Payment Processing** with Stripe Elements
- ✅ **Subscription Management** with automatic billing
- ✅ **Webhook Handling** for real-time updates
- ✅ **Receipt Generation** and transaction history
- ✅ **Multiple Payment Methods** (cards, digital wallets)
- ✅ **PCI Compliance** through Stripe's secure infrastructure

### Setting Up Stripe

1. **Create Stripe Account** at [stripe.com](https://stripe.com)

2. **Get API Keys** from Stripe Dashboard:

   ```bash
   # Add to your .env file
   STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

3. **Configure Webhooks** in Stripe Dashboard:
   - Endpoint URL: `https://your-backend-domain/api/payments/webhook/`
   - Events: `customer.subscription.*`, `payment_intent.succeeded`

### Payment API Endpoints

```
POST /api/payments/create-intent/
# Create payment intent for subscription

POST /api/payments/webhook/
# Stripe webhook endpoint (no auth required)

GET /api/subscription/status/
# Get current user's subscription status

GET /api/subscription/plans/
# Get available subscription plans

POST /api/subscription/cancel/
# Cancel subscription (end of period)
```

## 🔄 MCP Integration

Airwave includes MCP tools for external AI capabilities:

### Available Tools

1. **calculate_vo2max**

   - Calculates VO2 max from distance, time, and gender
   - Input: `{distance: number, time: number, gender: string}`

2. **get_fitness_tips**
   - Provides personalized fitness advice based on VO2 max
   - Input: `{vo2max: number}`

### Configuring MCP

Add to your MCP settings file:

```json
{
  "mcpServers": {
    "airwave": {
      "command": "node",
      "args": ["/path/to/mcp-airwave/dist/index.js"]
    }
  }
}
```

## 🔒 Security & Production Deployment

### Environment Setup

1. **Copy environment template:**

```bash
cp .env.example .env
```

2. **Generate secure secret key:**

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

3. **Update `.env` with production values:**

```bash
# Use strong, unique values for production
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Security Checklist

- ✅ **Environment Variables**: Sensitive data moved to `.env`
- ✅ **DEBUG Disabled**: Set to `False` in production
- ✅ **Secure Headers**: XSS protection, content sniffing prevention
- ✅ **HTTPS Enforcement**: SSL redirect and HSTS enabled
- ✅ **CSRF Protection**: Trusted origins configured
- ✅ **Rate Limiting**: API throttling to prevent abuse
- ✅ **Logging**: Error logging for monitoring
- ✅ **CORS Security**: Restricted to allowed domains
- ✅ **Data Encryption**: AES-256 encryption for sensitive health data

### SEO & Performance Features

- ✅ **Complete SEO Meta Tags**: Title, description, keywords, Open Graph, Twitter cards
- ✅ **Structured Data (JSON-LD)**: Rich snippets for search engines
- ✅ **PWA Manifest**: Progressive Web App capabilities
- ✅ **Robots.txt & Sitemap.xml**: Search engine optimization
- ✅ **Mobile Optimization**: Responsive design and mobile meta tags
- ✅ **Font Optimization**: Preconnect for Google Fonts
- ✅ **Accessibility**: Skip links and semantic HTML

## 🌐 Deployment

### Backend Deployment (Heroku)

1. **Create Heroku app:**

```bash
heroku create your-airwave-backend
```

2. **Set environment variables:**

```bash
heroku config:set DJANGO_SETTINGS_MODULE=fitness_backend.settings
heroku config:set SECRET_KEY=your-secret-key
heroku config:set DATABASE_URL=your-database-url
```

3. **Deploy:**

```bash
git push heroku main
```

4. **Run migrations:**

```bash
heroku run python manage.py migrate
```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Deploy:**

```bash
cd frontend
vercel --prod
```

### Alternative Deployment Options

- **Railway**: Full-stack deployment with databases
- **Render**: Django + PostgreSQL hosting
- **Netlify**: Frontend hosting with serverless functions
- **AWS/GCP/Azure**: Enterprise cloud deployments

## 🔧 Maintenance

### Database Management

- **Backup regularly**: Use PostgreSQL backup tools
- **Monitor performance**: Check query execution times
- **Data cleanup**: Implement data retention policies

### AI Model Updates

- **Norse SNN**: Update models for improved accuracy
- **VO2 formulas**: Validate against latest research
- **MCP tools**: Keep external integrations current

### Security Updates

- **Dependencies**: Regularly update Python and Node packages
- **Django security**: Apply security patches promptly
- **API security**: Implement proper authentication/authorization

### Monitoring

- **Application logs**: Monitor Django and Angular logs
- **Performance**: Track API response times
- **User analytics**: Implement usage tracking

## 📊 VO2 Max Calculation Methods

### 1. Cooper Test

Based on 12-minute run distance:

- Male: VO2 max = (distance_m - 504.9) / 44.73
- Female: VO2 max = (distance_m - 504.1) / 44.73

### 2. Heart Rate Based

VO2 max = 15.3 × (max HR / resting HR)

### 3. Norse SNN Analysis

Advanced temporal processing of heart rate variability for more accurate predictions.

## 🚀 Complete Deployment Guide

Airwave is designed for easy deployment to modern cloud platforms. This guide covers Railway (recommended), Heroku, Vercel, and other options.

### Railway Deployment (Recommended) ⭐

**⚠️ IMPORTANT**: This is a **monorepo with multiple services**. You must deploy each service as a **separate Railway project**. Do NOT deploy the entire repository as one project.

#### Step-by-Step Deployment

1. **Install Railway CLI:**

```bash
npm install -g @railway/cli
railway login --browserless
```

2. **Create Projects on Railway Dashboard:**

   Since Railway CLI `init` can sometimes have issues, create projects directly on the [Railway Dashboard](https://railway.com):

   - Create **Backend Project**: Name it `airwave-backend`
   - Create **Frontend Project**: Name it `airwave-frontend`
   - Create **MCP Project** (optional): Name it `airwave-mcp`

3. **Deploy Backend Service (First):**

```bash
# Navigate to backend directory
cd backend

# Link to your Railway backend project
railway link --project airwave-backend

# Deploy backend
railway up

# Set environment variables
railway variables set DEBUG=False
railway variables set SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")
railway variables set FIELD_ENCRYPTION_KEY=$(python3 -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())")
railway variables set ALLOWED_HOSTS=airwave-backend-production.up.railway.app

# Run migrations
railway run python manage.py migrate
railway run python manage.py createsuperuser
```

4. **Deploy Frontend Service (Second):**

```bash
# Navigate to frontend directory
cd ../frontend

# Link to your Railway frontend project
railway link --project airwave-frontend

# Deploy frontend
railway up

# Set API URL (replace with your actual backend URL from Railway dashboard)
railway variables set VITE_API_URL=https://airwave-backend-production.up.railway.app
```

5. **Deploy MCP Server (Optional - Third):**

```bash
# Navigate to MCP directory
cd ../mcp-airwave

# Link to your Railway MCP project
railway link --project airwave-mcp

# Deploy MCP server
railway up
```

#### Update CORS Settings

After both backend and frontend are deployed, update backend CORS settings:

```bash
# Switch to backend project
railway link --project airwave-backend

# Set CORS to allow frontend
railway variables set CORS_ALLOWED_ORIGINS=https://airwave-frontend-production.up.railway.app
railway variables set CSRF_TRUSTED_ORIGINS=https://airwave-frontend-production.up.railway.app
```

#### Manual Service Management

If you prefer to manage services individually:

```bash
# Backend only
cd backend && railway init airwave-backend && railway up

# Frontend only
cd frontend && railway init airwave-frontend && railway up

# MCP server (optional)
cd mcp-airwave && railway init airwave-mcp && railway up
```

#### CORS Configuration

Update backend environment variables with your frontend URL:

```bash
railway variables set CORS_ALLOWED_ORIGINS=https://airwave-production.up.railway.app
railway variables set CSRF_TRUSTED_ORIGINS=https://airwave-production.up.railway.app
```

### Heroku Deployment

#### Backend

```bash
# Create Heroku apps
heroku create airwave-backend
heroku create airwave-frontend

# Backend setup
cd backend
heroku git:remote -a airwave-backend
heroku addons:create heroku-postgresql

# Set environment variables
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(32))")
heroku config:set FIELD_ENCRYPTION_KEY=$(python3 -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())")
heroku config:set ALLOWED_HOSTS=airwave-backend.herokuapp.com

# Deploy
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

#### Frontend

```bash
cd frontend
heroku git:remote -a airwave-frontend

# Create static.json for SPA routing
echo '{
  "root": "dist",
  "routes": {
    "/**": "index.html"
  }
}' > static.json

# Set API URL
heroku config:set API_URL=https://airwave-backend.herokuapp.com

git push heroku main
```

### Vercel + Railway Hybrid

For optimal performance, deploy frontend to Vercel and backend to Railway:

```bash
# Backend on Railway (as above)
railway init airwave-backend
railway up

# Frontend on Vercel
cd frontend
npm i -g vercel
vercel --prod

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-railway-backend-url
```

### Environment Variables Required

#### Backend (.env)

```bash
DEBUG=False
SECRET_KEY=your-32-char-secret-key
FIELD_ENCRYPTION_KEY=your-44-char-fernet-key
ALLOWED_HOSTS=yourdomain.com,your-backend-url
CORS_ALLOWED_ORIGINS=https://your-frontend-url
CSRF_TRUSTED_ORIGINS=https://your-frontend-url
SECURE_SSL_REDIRECT=True
```

#### Frontend (.env)

```bash
VITE_API_URL=https://your-backend-api-url
```

### Data Encryption Setup

**Critical**: Set up encryption keys before deploying to production.

#### Generate Keys

```bash
# Django secret key
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Field encryption key
python3 -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
```

#### Encrypted Data

- **User Profiles**: Age, weight, height (PII protection)
- **Workout Data**: Heart rate metrics (biometric data)
- **Security**: AES-256 encryption at database level

### Post-Deployment Checklist

- ✅ **SSL Certificate**: Automatic on Railway/Vercel
- ✅ **Database Migration**: Run `python manage.py migrate`
- ✅ **Static Files**: Served correctly on frontend
- ✅ **API Connectivity**: Frontend can reach backend APIs
- ✅ **CORS Headers**: Properly configured for cross-origin requests
- ✅ **Environment Variables**: All secrets set securely
- ✅ **Encryption Keys**: Generated and configured
- ✅ **Domain Setup**: airwave.fitness configured
- ✅ **SEO Setup**: Sitemap submitted to Google Search Console
- ✅ **Social Media**: Open Graph images created and tested

### Troubleshooting

#### Common Issues

**CORS Errors:**

```bash
# Check CORS_ALLOWED_ORIGINS in backend
railway variables set CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

**Database Connection:**

```bash
# Railway provides DATABASE_URL automatically
# Check with: railway run python manage.py dbshell
```

**Static Files:**

```bash
# For SPA routing, ensure proper configuration
# Railway/Vercel handle this automatically
```

**Encryption Issues:**

```bash
# Regenerate keys if deployment fails
python3 -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
```

### Production URLs

After deployment, update your local development to use production URLs:

- **Backend API**: `https://your-backend.railway.app`
- **Frontend App**: `https://your-frontend.vercel.app` or Railway URL
- **MCP Server**: Deploy separately if needed

### Monitoring & Maintenance

- **Logs**: `railway logs` or Railway dashboard
- **Metrics**: Railway provides built-in monitoring
- **Backups**: Railway automatic database backups
- **Scaling**: Easy horizontal scaling on Railway

Railway is recommended for its simplicity and Railway + Vercel for optimal performance. Both provide automatic SSL, scaling, and excellent developer experience!

**Note**: The `railway.toml` files in each service directory are configured for Railway's deployment system. If you encounter any issues, Railway will automatically detect your Python/Node.js applications and configure them appropriately.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the Mozilla Public License Version 2.0 - see the LICENSE file for details.

## 📞 Support

For questions or issues:

- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

## 🔬 Research & Accuracy

VO2 max calculations are based on established scientific formulas. For medical advice, consult healthcare professionals. Airwave provides estimates for informational purposes only.
