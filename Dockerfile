FROM python:3.10-slim

WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create directories for Hugging Face cache and token with proper permissions
RUN mkdir -p /code/.cache/huggingface/hub && \
    mkdir -p /code/.cache/huggingface/token && \
    chown -R root:root /code/.cache && \
    chmod -R 777 /code/.cache

# Set environment variables for Hugging Face
ENV HF_HOME=/code/.cache/huggingface
ENV TRANSFORMERS_CACHE=/code/.cache/huggingface/hub

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Run the application
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "7860"] 