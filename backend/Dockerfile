FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PIP_NO_CACHE_DIR=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install gunicorn globally for production
RUN pip install --no-cache-dir gunicorn

# Create non-root user
RUN useradd --create-home --shell /bin/bash app

# Copy application code
COPY . .

# Set proper ownership
RUN chown -R app:app /app

# Switch to non-root user
USER app

# Create startup script
RUN echo '#!/bin/bash\n\
set -e\n\
echo "Starting Airwave Backend..."\n\
echo "PORT is set to: $PORT"\n\
python manage.py migrate\n\
echo "Starting Gunicorn on port $PORT"\n\
exec gunicorn fitness_backend.wsgi:application --bind 0.0.0.0:$PORT --access-logfile - --error-logfile -' > /app/start.sh && \
chmod +x /app/start.sh

# Collect static files
RUN python manage.py collectstatic --noinput

# Run startup script
CMD ["/app/start.sh"]
