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

   #### Step-by-Step Setup:

   a. **Go to Stripe Dashboard**: [dashboard.stripe.com](https://dashboard.stripe.com)

   b. **Navigate to API Keys**:

   - Click "Developers" in the left sidebar
   - Click "API keys" tab

   c. **Get Your Keys**:

   - **Publishable key** (starts with `pk_test_` for test mode): Used in frontend
   - **Secret key** (starts with `sk_test_` for test mode): Used in backend
   - **⚠️ Keep secret key secure** - never expose it in frontend code

   d. **Create Webhook Endpoint** (for production):

   - Go to "Webhooks" in Developers section
   - Click "Add endpoint"
   - URL: `https://your-backend-domain/api/payments/webhook/`
   - Events: Select `customer.subscription.*` and `payment_intent.succeeded`
   - Copy the **webhook signing secret** (starts with `whsec_`)

   #### Environment Variables:

   **For Railway Backend Deployment:**

   ```bash
   # In Railway dashboard → Your backend service → Variables tab
   STRIPE_PUBLIC_KEY=pk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   STRIPE_SECRET_KEY=sk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   **For Local Development (.env file):**

   ```bash
   # In backend/.env file
   STRIPE_PUBLIC_KEY=pk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   STRIPE_SECRET_KEY=sk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   **For Frontend (Railway):**

   ```bash
   # In Railway dashboard → Your frontend service → Variables tab
   VITE_STRIPE_PUBLIC_KEY=pk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   #### Testing Your Setup:

   ```bash
   # Test API keys (replace with your actual keys)
   curl -X POST https://api.stripe.com/v1/tokens \
     -u sk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX: \
     -d card[number]=4242424242424242 \
     -d card[exp_month]=12 \
     -d card[exp_year]=2025 \
     -d card[cvc]=123
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

### CI/CD with GitHub Actions

This project includes automated CI/CD pipelines using GitHub Actions:

#### Setup GitHub Secrets

1. **Go to your GitHub repository Settings → Secrets and variables → Actions**

2. **Add Railway Token:**
   - Name: `RAILWAY_TOKEN`
   - Value: Get from Railway Dashboard → Account Settings → Tokens

#### What the CI/CD Pipeline Does

- ✅ **Runs on every push/PR to main/master branches**
- ✅ **Tests Backend:** Django migrations, tests, linting
- ✅ **Tests Frontend:** Angular linting, tests, production build
- ✅ **Deploy Instructions:** Provides deployment commands when tests pass
- ✅ **Caching:** Speeds up builds with dependency caching

#### Pipeline Jobs

1. **`test-backend`**: Python 3.11, Django tests, flake8 linting
2. **`test-frontend`**: Node.js 22, Angular tests, production build
3. **`deploy-railway`**: Shows deployment instructions (manual trigger)

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
SECRET_KEY=your-32-char-secret-key
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

### Railway Deployment (Recommended) ⭐

**⚠️ IMPORTANT**: This is a **monorepo with multiple services**. You must deploy each service as a **separate Railway project**. Do NOT deploy the entire repository as one project.

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

Airwave is designed for easy deployment to Railway with Cloudflare for custom domains.

### Railway PostgreSQL Database Setup

**Yes! Railway provides PostgreSQL databases automatically**, and Airwave is configured to use them seamlessly. Here's the complete setup guide:

#### Step 1: Create Railway Projects

Go to [Railway Dashboard](https://railway.com) and create **three separate projects**:

1. **Backend Project**: `airwave-backend` (with PostgreSQL database)
2. **Frontend Project**: `airwave-frontend`
3. **MCP Project** (optional): `airwave-mcp`

#### Step 2: Add and Link PostgreSQL Database

**CRITICAL**: You must link the PostgreSQL database to your backend service.

In your **backend project** (`airwave-backend`):

1. **Add PostgreSQL Plugin:**

   - Click "Add Plugin" in the project dashboard
   - Search for "PostgreSQL" and select it
   - Choose your plan (Hobby plan is free and sufficient for development)
   - Click "Add PostgreSQL"

2. **Link Database to Backend Service:**

   - In your backend project, go to the **"Services"** tab
   - Find your backend service (should be named something like `airwave-backend`)
   - Click on the service to open its settings
   - In the service settings, find the **"Plugins"** section
   - Click **"Link Plugin"**
   - Select the PostgreSQL plugin you just created
   - Click **"Link Plugin"**

3. **Verify Connection:**
   - Go to your backend service **"Variables"** tab
   - You should now see PostgreSQL environment variables:
     ```
     PGDATABASE=railway
     PGHOST=containers-us-west-XXX.railway.app
     PGPORT=XXXX
     PGPASSWORD=your-auto-generated-password
     PGUSER=postgres
     ```

Railway will automatically:

- ✅ Create a PostgreSQL database instance
- ✅ Set up environment variables in your backend service
- ✅ Configure SSL connections
- ✅ Handle database migrations automatically

#### Step 3: Configure Environment Variables

In your `airwave-backend` Railway project **Variables tab**, add these:

```bash
# Django Configuration
DEBUG=False
SECRET_KEY=your-32-char-secret-key-here
FIELD_ENCRYPTION_KEY=your-44-char-fernet-key-here

# Domain Configuration (will be auto-populated by Railway)
ALLOWED_HOSTS=airwave-backend-production.up.railway.app

# CORS Configuration (update after frontend deployment)
CORS_ALLOWED_ORIGINS=https://airwave-frontend-production.up.railway.app
CSRF_TRUSTED_ORIGINS=https://airwave-frontend-production.up.railway.app

# Security (optional - Railway provides SSL automatically)
SECURE_SSL_REDIRECT=True
```

#### Step 4: Generate Secure Keys

Run these commands locally to generate your keys:

```bash
# Django Secret Key (32+ characters)
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# Field Encryption Key (44 characters for Fernet)
python3 -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
```

#### Step 5: Deploy Backend

Railway will automatically:

- ✅ Detect your Django application
- ✅ Install Python dependencies from `requirements.txt`
- ✅ Run database migrations (`python manage.py migrate`)
- ✅ Start your Django server with PostgreSQL connection
- ✅ Set up automatic SSL certificates

#### Step 6: Verify Database Connection

After deployment, check your backend logs in Railway dashboard. You should see:

```
Django DB Connection: PostgreSQL
Database migrations completed successfully
Server running on https://airwave-backend-production.up.railway.app
```

#### Step 7: Test Database Functionality

```bash
# Test API endpoints (replace with your Railway URL)
curl https://airwave-backend-production.up.railway.app/api/health/
curl https://airwave-backend-production.up.railway.app/api/workouts/
```

### Railway PostgreSQL Features

Railway's PostgreSQL provides:

- ✅ **Automatic SSL**: Secure connections built-in
- ✅ **Backups**: Automatic daily backups
- ✅ **Scaling**: Vertical and horizontal scaling available
- ✅ **Monitoring**: Built-in performance metrics
- ✅ **High Availability**: Automatic failover and redundancy
- ✅ **Point-in-Time Recovery**: Restore to any point in time

### Environment Variables (Auto-Configured by Railway)

Railway automatically provides these PostgreSQL environment variables:

```bash
# Database Connection (automatically set by Railway)
PGHOST=containers-us-west-XXX.railway.app
PGPORT=XXXX
PGDATABASE=railway
PGUSER=postgres
PGPASSWORD=your-auto-generated-password

# Railway Environment Detection
RAILWAY_ENVIRONMENT_NAME=production
RAILWAY_PROJECT_ID=your-project-id
```

### Django PostgreSQL Configuration

Airwave automatically detects Railway and uses PostgreSQL:

```python
# settings.py - Automatic PostgreSQL detection
if os.getenv('RAILWAY_ENVIRONMENT_NAME'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('PGDATABASE'),
            'USER': os.getenv('PGUSER'),
            'PASSWORD': os.getenv('PGPASSWORD'),
            'HOST': os.getenv('PGHOST'),
            'PORT': os.getenv('PGPORT', '5432'),
            'OPTIONS': {
                'sslmode': 'require',
            },
        }
    }
```

### Database Management Commands

```bash
# Connect to your Railway PostgreSQL database
railway run python manage.py dbshell

# Run migrations
railway run python manage.py migrate

# Create superuser
railway run python manage.py createsuperuser

# Backup database (Railway does this automatically)
railway run pg_dump > backup.sql
```

### Railway Deployment (Recommended) ⭐

**⚠️ IMPORTANT**: This is a **monorepo with multiple services**. You must deploy each service as a **separate Railway project**. Do NOT deploy the entire repository as one project.

#### Step-by-Step Deployment

1. **Create Projects on Railway Dashboard:**

   Go to the [Railway Dashboard](https://railway.com) and create three projects:

   - **Backend Project**: Name it `airwave-backend`
   - **Frontend Project**: Name it `airwave-frontend`
   - **MCP Project** (optional): Name it `airwave-mcp`

2. **Generate Required Keys Locally:**

   ```bash
   # Generate Django secret key
   python3 -c "import secrets; print(secrets.token_urlsafe(32))"

   # Generate encryption key
   python3 -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
   ```

3. **Deploy Backend Service (First):**

   In the Railway Dashboard for `airwave-backend`:

   - **Add PostgreSQL Plugin**: Click "Add Plugin" → PostgreSQL → Add
   - **Variables Tab**: Add these environment variables:

     ```
     DEBUG=False
     SECRET_KEY=your-generated-secret-key-here
     FIELD_ENCRYPTION_KEY=your-generated-encryption-key-here
     ALLOWED_HOSTS=airwave-backend-production.up.railway.app
     ```

   - **Deploy Tab**: Railway will build and deploy all services using Docker containers

   - **Database Setup**: Railway automatically provides PostgreSQL - migrations run automatically in backend container

4. **Deploy Frontend Service (Second):**

   In the Railway Dashboard for `airwave-frontend`:

   - **Variables Tab**: Add environment variable:

     ```
     VITE_API_URL=https://airwave-backend-production.up.railway.app
     ```

   - **Deploy Tab**: Railway will build your Angular app for production and serve the static files

5. **Deploy MCP Server (Optional - Third):**

   In the Railway Dashboard for `airwave-mcp`:

   - Railway will automatically detect and deploy your Node.js MCP server

#### Update CORS Settings

After both backend and frontend are deployed, in the `airwave-backend` Railway dashboard:

- **Variables Tab**: Add CORS settings:
  ```
  CORS_ALLOWED_ORIGINS=https://airwave-frontend-production.up.railway.app
  CSRF_TRUSTED_ORIGINS=https://airwave-frontend-production.up.railway.app
  ```

#### CLI Alternative (If Preferred)

If you prefer using Railway CLI:

```bash
# Install CLI
npm install -g @railway/cli
railway login

# Link and deploy (after creating projects on dashboard)
cd backend && railway link --project airwave-backend && railway up
cd ../frontend && railway link --project airwave-frontend && railway up
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

- ✅ **SSL Certificate**: Automatic on Railway
- ✅ **Database Migration**: Run `python manage.py migrate`
- ✅ **Static Files**: Served correctly on frontend
- ✅ **API Connectivity**: Frontend can reach backend APIs
- ✅ **CORS Headers**: Properly configured for cross-origin requests
- ✅ **Environment Variables**: All secrets set securely
- ✅ **Encryption Keys**: Generated and configured
- ✅ **Domain Setup**: Custom domain configured (see below)
- ✅ **SEO Setup**: Sitemap submitted to Google Search Console
- ✅ **Social Media**: Open Graph images created and tested

## 🌐 Custom Domain Setup with Cloudflare

Airwave supports custom domains for production deployments. Here's how to set up your domain with Cloudflare and Railway:

### Prerequisites

- ✅ **Domain Name**: Purchase from any registrar (Namecheap, GoDaddy, etc.)
- ✅ **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
- ✅ **Railway Services**: Deployed and running

### Step 1: Add Domain to Cloudflare

1. **Log into Cloudflare** and click "Add Site"

2. **Enter your domain** (e.g., `airwave.fitness`)

3. **Select Plan**: Free plan works for most use cases

4. **Update Nameservers**:
   - Copy Cloudflare's nameservers
   - Go to your domain registrar
   - Replace default nameservers with Cloudflare's
   - Wait 24-48 hours for DNS propagation

### Step 2: Configure DNS Records

In Cloudflare DNS settings, add these records:

#### Frontend (Main Domain)

```
Type: CNAME
Name: @
Content: [your-frontend-service].up.railway.app
Proxy Status: Proxied (orange cloud)
TTL: Auto
```

#### Backend API (Subdomain)

```
Type: CNAME
Name: api
Content: [your-backend-service].up.railway.app
Proxy Status: Proxied (orange cloud)
TTL: Auto
```

#### Optional: www Redirect

```
Type: CNAME
Name: www
Content: [your-frontend-service].up.railway.app
Proxy Status: Proxied (orange cloud)
TTL: Auto
```

### Step 3: Railway Domain Configuration

#### Frontend Service

1. **Go to Railway Dashboard** → Your frontend service
2. **Settings Tab** → Domains
3. **Add Domain**: Enter your main domain (e.g., `airwave.fitness`)
4. **Add www Domain**: Enter `www.airwave.fitness` (optional)

#### Backend Service

1. **Go to Railway Dashboard** → Your backend service
2. **Settings Tab** → Domains
3. **Add Domain**: Enter your API subdomain (e.g., `api.airwave.fitness`)

### Step 4: Update Application Configuration

#### Frontend Environment Variables

Update your frontend Railway service:

```
VITE_API_URL=https://api.airwave.fitness
PORT=8080
```

#### Backend Environment Variables

Update your backend Railway service:

```
ALLOWED_HOSTS=api.airwave.fitness,airwave.fitness,www.airwave.fitness
CORS_ALLOWED_ORIGINS=https://airwave.fitness,https://www.airwave.fitness
CSRF_TRUSTED_ORIGINS=https://airwave.fitness,https://www.airwave.fitness
PORT=8080
```

### Step 5: SSL/TLS Configuration

Cloudflare handles SSL automatically:

1. **SSL/TLS Tab** in Cloudflare → Overview
2. **SSL Status**: Should show "Active Certificate"
3. **Railway**: Provides automatic SSL for custom domains

### Step 6: Testing and Verification

#### DNS Propagation

```bash
# Check DNS records
dig airwave.fitness
dig api.airwave.fitness

# Should return Railway IP addresses
```

#### SSL Certificate

```bash
# Test SSL
curl -I https://airwave.fitness
curl -I https://api.airwave.fitness

# Should return 200 OK with valid SSL
```

#### Full Application Test

```bash
# Test frontend
curl https://airwave.fitness

# Test API
curl https://api.airwave.fitness/api/health/
```

### Cloudflare Optimization Settings

#### Speed Tab

- ✅ **Auto Minify**: Enable HTML, CSS, JavaScript
- ✅ **Brotli Compression**: Enable
- ✅ **Rocket Loader**: Enable (for better loading)

#### Caching Tab

- ✅ **Caching Level**: Standard
- ✅ **Browser Cache TTL**: 4 hours
- ✅ **Always Online**: Enable

#### Rules (Page Rules)

Create these rules for better performance:

```
# API Caching Rule
URL: api.airwave.fitness/*
Cache Level: Bypass
```

```
# Static Assets Caching
URL: airwave.fitness/static/*
Cache Level: Cache Everything
Edge Cache TTL: 1 year
Browser Cache TTL: 1 year
```

### Troubleshooting

#### DNS Issues

- **Propagation Delay**: Wait 24-48 hours after nameserver changes
- **Check DNS**: Use `dig` or online DNS checkers
- **Clear Cache**: Flush local DNS cache

#### SSL Issues

- **Mixed Content**: Ensure all assets use HTTPS
- **Certificate Status**: Check Cloudflare SSL/TLS tab
- **Railway SSL**: Automatic for custom domains

#### CORS Issues

- **Update ALLOWED_HOSTS**: Include all domain variations
- **Check Origins**: Ensure CORS settings match your domains
- **API Calls**: Frontend should use full HTTPS URLs

#### Performance Issues

- **Cloudflare Status**: Check if proxy is enabled (orange cloud)
- **Railway Logs**: Check for application errors
- **Caching**: Clear Cloudflare cache if needed

### Domain Examples

| Service  | Railway URL                                 | Custom Domain         |
| -------- | ------------------------------------------- | --------------------- |
| Frontend | `airwave-production.up.railway.app`         | `airwave.fitness`     |
| Backend  | `airwave-backend-production.up.railway.app` | `api.airwave.fitness` |
| MCP      | `airwave-mcp-production.up.railway.app`     | `mcp.airwave.fitness` |

### Security Benefits

- ✅ **DDoS Protection**: Cloudflare's network protection
- ✅ **SSL/TLS**: Automatic certificate management
- ✅ **WAF**: Web Application Firewall
- ✅ **Bot Protection**: Automated bot detection
- ✅ **Rate Limiting**: Built-in request throttling

### Cost Breakdown

- ✅ **Domain**: $10-20/year from registrar
- ✅ **Cloudflare**: Free plan (sufficient for most apps)
- ✅ **Railway**: Custom domains included in paid plans
- ✅ **SSL**: Free with both Cloudflare and Railway

**Total Cost**: ~$15-25/year for professional domain setup

### Migration Checklist

- ✅ **Domain Purchased**: From registrar
- ✅ **Cloudflare Setup**: Nameservers updated
- ✅ **DNS Records**: CNAME records added
- ✅ **Railway Domains**: Custom domains configured
- ✅ **Environment Variables**: Updated for production
- ✅ **SSL Active**: Certificates working
- ✅ **Application Tested**: All endpoints working
- ✅ **SEO Updated**: Search engines notified of domain change

**Your Airwave application will now have a professional custom domain with enterprise-grade DNS and security!** 🌐✨

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
# For SPA routing, Railway handles this automatically
```

**Encryption Issues:**

```bash
# Regenerate keys if deployment fails
python3 -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
```

### Production URLs

After deployment, update your local development to use production URLs:

- **Backend API**: `https://your-backend.railway.app`
- **Frontend App**: `https://your-frontend.railway.app`
- **MCP Server**: Deploy separately if needed

### Monitoring & Maintenance

- **Logs**: `railway logs` or Railway dashboard
- **Metrics**: Railway provides built-in monitoring
- **Backups**: Railway automatic database backups
- **Scaling**: Easy horizontal scaling on Railway

Railway provides automatic SSL, scaling, and excellent developer experience for production deployments!

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
