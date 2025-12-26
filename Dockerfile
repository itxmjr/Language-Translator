FROM python:3.13-slim

# Install Node.js and dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Set working directory
WORKDIR /app

# Create a non-root user
RUN useradd -m -u 1000 user

# Copy files keeping ownership
COPY --chown=user:user . .

# Switch to user
USER user

# Setup Backend
WORKDIR /app/backend
RUN uv sync

# Setup Frontend
WORKDIR /app/frontend
# We need to install dependencies and build
# Note: In a real production scenario, we might want to do this in a separate stage 
# to keep the image smaller, but this is simpler for a single-file setup.
RUN npm ci
RUN npm run build

# Expose the port
EXPOSE 7860

# Set home for uv/npm
ENV HOME=/home/user

WORKDIR /app
CMD ["bash", "start.sh"]
