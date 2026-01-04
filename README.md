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

### Data Encryption Setup

Airwave uses **AES-256 encryption** to protect sensitive health and personal data at the database level.

#### Encrypted Fields

- **User Profile**: Age, weight, height (PII and sensitive health data)
- **Workout Data**: Heart rate metrics (biometric data)

#### Encryption Key Setup

1. **Generate encryption key:**

```bash
python3 -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
```

2. **Add to environment variables:**

```bash
# .env file
FIELD_ENCRYPTION_KEY=your-generated-44-character-fernet-key-here
```

3. **Key Requirements:**

- Must be 32 bytes (44 characters when base64 encoded)
- Use different keys for development and production
- Store securely and backup encryption keys
- Never commit keys to version control

#### Security Benefits

- **At Rest Protection**: Data encrypted in database using Fernet (AES-128-CBC + HMAC)
- **Regulatory Compliance**: HIPAA/GDPR-ready for health applications
- **Zero Knowledge**: Data encrypted before storage, decrypted only when accessed
- **Key Rotation**: Support for key rotation without data migration

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues:

- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

## 🔬 Research & Accuracy

VO2 max calculations are based on established scientific formulas. For medical advice, consult healthcare professionals. Airwave provides estimates for informational purposes only.
