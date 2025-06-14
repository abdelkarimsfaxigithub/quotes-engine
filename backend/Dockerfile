# Base image with Python and system libs
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies (WeasyPrint + build tools)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpango-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libcairo2 \
    libffi-dev \
    libpq-dev \
    python3-dev \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set workdir
WORKDIR /app

# Copy project files
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port (Django default)
EXPOSE 8000

# Run the server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
