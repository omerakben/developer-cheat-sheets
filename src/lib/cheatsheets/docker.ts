import { CheatSheet } from "@/types/cheatsheet";

export const dockerCheatSheet: CheatSheet = {
  title: "Docker & Containers",
  description:
    "Master Docker containerization from basics to production deployments. Container management, Docker Compose, multi-stage builds, and best practices.",
  metadata: {
    lastUpdated: "2025-01-01",
    version: "1.0.0",
    author: "Developer CheatSheets",
  },
  sections: [
    {
      id: "basics",
      title: "Docker Basics",
      description:
        "Essential Docker commands for building, running, and managing containers",
      examples: [
        {
          title: "Run Your First Container",
          description:
            "Start containers from images, the building blocks of Docker.",
          code: `# Run container from image
docker run nginx

# Run in detached mode (background)
docker run -d nginx

# Run with name
docker run -d --name my-nginx nginx

# Run and remove after exit
docker run --rm nginx

# Run interactively with terminal
docker run -it ubuntu /bin/bash

# Run with port mapping (host:container)
docker run -d -p 8080:80 nginx

# Run with environment variables
docker run -d -e API_KEY=secret -e DEBUG=true myapp

# Run with volume mount
docker run -d -v /host/path:/container/path nginx
docker run -d -v mydata:/data postgres  # Named volume`,
          language: "bash",
          difficulty: "beginner",
          tags: ["run", "container", "basics"],
          documentationUrl: "https://docs.docker.com/engine/reference/commandline/run/",
        },
        {
          title: "Container Management",
          description: "List, start, stop, and inspect running containers.",
          code: `# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List container IDs only
docker ps -q

# Start stopped container
docker start container-name

# Stop running container
docker stop container-name

# Restart container
docker restart container-name

# Pause container
docker pause container-name
docker unpause container-name

# Remove container
docker rm container-name

# Remove running container (force)
docker rm -f container-name

# Remove all stopped containers
docker container prune

# View container logs
docker logs container-name
docker logs -f container-name  # Follow logs
docker logs --tail 100 container-name  # Last 100 lines

# Execute command in running container
docker exec -it container-name /bin/bash
docker exec container-name ls /app

# Inspect container details
docker inspect container-name

# View container resource usage
docker stats
docker stats container-name`,
          language: "bash",
          difficulty: "beginner",
          tags: ["management", "containers", "logs"],
        },
      ],
    },
    {
      id: "images",
      title: "Docker Images",
      description: "Build, manage, and optimize Docker images",
      examples: [
        {
          title: "Build Images from Dockerfile",
          description:
            "Create custom images using Dockerfile instructions.",
          code: `# Build image from Dockerfile in current directory
docker build -t myapp:latest .

# Build with specific Dockerfile
docker build -f Dockerfile.prod -t myapp:prod .

# Build with build arguments
docker build --build-arg NODE_VERSION=18 -t myapp .

# Build without cache
docker build --no-cache -t myapp .

# Build and tag multiple names
docker build -t myapp:latest -t myapp:1.0.0 .

# List images
docker images

# Remove image
docker rmi image-name

# Remove unused images
docker image prune

# Remove all unused images (not just dangling)
docker image prune -a

# View image history (layers)
docker history myapp:latest

# Inspect image details
docker inspect myapp:latest`,
          language: "bash",
          difficulty: "beginner",
          tags: ["build", "images", "dockerfile"],
        },
        {
          title: "Basic Dockerfile",
          description:
            "Simple Dockerfile for a Node.js application.",
          code: `# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Run application
CMD ["node", "server.js"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js || exit 1`,
          language: "dockerfile",
          difficulty: "beginner",
          tags: ["dockerfile", "nodejs", "basic"],
          documentationUrl: "https://docs.docker.com/engine/reference/builder/",
        },
        {
          title: "Multi-Stage Build (Optimized)",
          description:
            "Reduce image size dramatically with multi-stage builds. Production-ready pattern.",
          code: `# Multi-stage Dockerfile for React app
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Result: Final image only contains nginx + built files
# No build tools, source code, or dev dependencies!`,
          language: "dockerfile",
          difficulty: "intermediate",
          tags: ["multi-stage", "optimization", "production"],
        },
        {
          title: "Push & Pull Images",
          description:
            "Share images via Docker Hub or private registries.",
          code: `# Login to Docker Hub
docker login

# Login to private registry
docker login registry.example.com

# Tag image for repository
docker tag myapp:latest username/myapp:latest
docker tag myapp:latest registry.example.com/myapp:latest

# Push to Docker Hub
docker push username/myapp:latest

# Push to private registry
docker push registry.example.com/myapp:latest

# Pull image
docker pull nginx:latest
docker pull username/myapp:1.0.0

# Pull all tags of an image
docker pull -a username/myapp

# Save image to tar file
docker save myapp:latest -o myapp.tar

# Load image from tar file
docker load -i myapp.tar

# Export container to tar
docker export container-name -o container.tar`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["registry", "push", "pull", "sharing"],
        },
      ],
    },
    {
      id: "compose",
      title: "Docker Compose",
      description: "Multi-container applications with docker-compose.yml",
      examples: [
        {
          title: "Basic Docker Compose",
          description:
            "Run multiple services together with one command.",
          code: `# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db/myapp
    depends_on:
      - db
      - redis
    volumes:
      - ./src:/app/src

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:`,
          language: "yaml",
          difficulty: "intermediate",
          tags: ["docker-compose", "multi-container", "yaml"],
          documentationUrl: "https://docs.docker.com/compose/",
        },
        {
          title: "Docker Compose Commands",
          description:
            "Manage multi-container applications with docker-compose.",
          code: `# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Build and start
docker-compose up --build

# Start specific service
docker-compose up web

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View running services
docker-compose ps

# View logs
docker-compose logs
docker-compose logs -f web  # Follow specific service

# Execute command in service
docker-compose exec web /bin/bash
docker-compose exec db psql -U postgres

# Restart services
docker-compose restart
docker-compose restart web

# Scale service (multiple instances)
docker-compose up --scale web=3

# View service configuration
docker-compose config

# Pull images for services
docker-compose pull`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["docker-compose", "commands", "management"],
        },
        {
          title: "Production Docker Compose",
          description:
            "Full-stack application with nginx, app, database, and redis.",
          code: `# docker-compose.prod.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped

  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    restart: unless-stopped
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '1.0'
          memory: 512M

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    secrets:
      - db_password
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    restart: unless-stopped

  backup:
    image: postgres:15-alpine
    depends_on:
      - db
    environment:
      PGPASSWORD_FILE: /run/secrets/db_password
    volumes:
      - ./backups:/backups
    secrets:
      - db_password
    command: >
      sh -c "while true; do
        pg_dump -h db -U appuser myapp > /backups/backup_\$(date +%Y%m%d_%H%M%S).sql
        sleep 86400
      done"

volumes:
  postgres-data:
  redis-data:

secrets:
  db_password:
    file: ./secrets/db_password.txt`,
          language: "yaml",
          difficulty: "advanced",
          tags: ["production", "docker-compose", "full-stack"],
        },
      ],
    },
    {
      id: "volumes",
      title: "Volumes & Data",
      description: "Persist data and share files between containers and host",
      examples: [
        {
          title: "Volume Operations",
          description:
            "Create and manage persistent storage for containers.",
          code: `# Create named volume
docker volume create mydata

# List volumes
docker volume ls

# Inspect volume
docker volume inspect mydata

# Remove volume
docker volume rm mydata

# Remove all unused volumes
docker volume prune

# Use volume with container
docker run -v mydata:/app/data myapp

# Read-only volume
docker run -v mydata:/app/data:ro myapp

# Bind mount (host directory)
docker run -v /host/path:/container/path myapp
docker run -v $(pwd):/app myapp  # Current directory

# Anonymous volume
docker run -v /app/data myapp

# Copy files from container to host
docker cp container:/path/to/file.txt ./file.txt

# Copy files from host to container
docker cp ./file.txt container:/path/to/

# Backup volume
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data

# Restore volume
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["volumes", "data", "persistence"],
          documentationUrl: "https://docs.docker.com/storage/volumes/",
        },
      ],
    },
    {
      id: "networking",
      title: "Networking",
      description: "Connect containers and configure network communication",
      examples: [
        {
          title: "Docker Networks",
          description:
            "Create isolated networks for container communication.",
          code: `# List networks
docker network ls

# Create network
docker network create mynetwork

# Create network with custom subnet
docker network create --subnet=172.20.0.0/16 mynetwork

# Inspect network
docker network inspect mynetwork

# Connect container to network
docker network connect mynetwork container-name

# Disconnect container from network
docker network disconnect mynetwork container-name

# Run container on specific network
docker run -d --network mynetwork --name web nginx

# Connect containers on same network (they can talk via container name)
docker network create app-network
docker run -d --network app-network --name db postgres
docker run -d --network app-network --name web myapp
# Now 'web' can connect to postgres at hostname 'db'

# Remove network
docker network rm mynetwork

# Remove all unused networks
docker network prune`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["networking", "communication", "isolation"],
        },
        {
          title: "Port Mapping & Exposure",
          description:
            "Expose container services to the host and external network.",
          code: `# Map container port to host port
docker run -p 8080:80 nginx  # host:container

# Map to random host port
docker run -p 80 nginx

# Map to specific interface
docker run -p 127.0.0.1:8080:80 nginx

# Map multiple ports
docker run -p 8080:80 -p 8443:443 nginx

# Map all exposed ports to random host ports
docker run -P nginx

# View port mappings
docker port container-name

# Example: Development setup
docker run -d \\
  -p 3000:3000 \\
  -p 5432:5432 \\
  -p 6379:6379 \\
  --name devstack \\
  myapp`,
          language: "bash",
          difficulty: "beginner",
          tags: ["ports", "networking", "exposure"],
        },
      ],
    },
    {
      id: "optimization",
      title: "Optimization & Best Practices",
      description: "Build smaller, faster, and more secure Docker images",
      examples: [
        {
          title: "Dockerfile Best Practices",
          description:
            "Optimize your Dockerfile for size, speed, and security.",
          code: `# ❌ BAD: Large image, inefficient
FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
COPY . /app
RUN pip3 install -r requirements.txt

# ✅ GOOD: Small image, efficient layers
FROM python:3.11-slim

# Create non-root user
RUN useradd -m -u 1000 appuser

WORKDIR /app

# Install dependencies first (cached layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

# Use specific versions
ENV PYTHON_VERSION=3.11

EXPOSE 8000

# Use exec form
CMD ["python", "app.py"]

# Key optimizations:
# 1. Use slim/alpine base images
# 2. Combine RUN commands to reduce layers
# 3. Copy dependencies before code (better caching)
# 4. Run as non-root user (security)
# 5. Use --no-cache-dir for pip
# 6. Use specific versions
# 7. .dockerignore to exclude files`,
          language: "dockerfile",
          difficulty: "advanced",
          tags: ["optimization", "best-practices", "security"],
        },
        {
          title: ".dockerignore File",
          description:
            "Exclude files from Docker build context to speed up builds.",
          code: `# .dockerignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Production
build/
dist/
*.log

# Git
.git/
.gitignore

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Environment files
.env
.env.local
.env.*.local

# Documentation
README.md
docs/

# CI/CD
.github/
.gitlab-ci.yml
Jenkinsfile`,
          language: "text",
          difficulty: "beginner",
          tags: ["dockerignore", "optimization", "build"],
        },
        {
          title: "Health Checks",
          description:
            "Monitor container health and enable automatic restarts.",
          code: `# In Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:8000/health || exit 1

# Or in docker-compose.yml
services:
  web:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 40s

# View health status
docker ps
docker inspect container-name | grep -A 10 Health

# Node.js health check example
# healthcheck.js
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', () => process.exit(1));
request.end();`,
          language: "dockerfile",
          difficulty: "intermediate",
          tags: ["healthcheck", "monitoring", "reliability"],
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting & Debugging",
      description: "Debug containers and solve common Docker issues",
      examples: [
        {
          title: "Debug Running Containers",
          description: "Tools and techniques to diagnose container issues.",
          code: `# View container logs
docker logs container-name
docker logs -f container-name  # Follow
docker logs --tail 100 container-name
docker logs --since 30m container-name

# Inspect container
docker inspect container-name
docker inspect --format='{{.State.Status}}' container-name
docker inspect --format='{{.NetworkSettings.IPAddress}}' container-name

# View running processes
docker top container-name

# Execute commands for debugging
docker exec -it container-name /bin/bash
docker exec -it container-name sh  # For alpine

# View resource usage
docker stats container-name

# Check filesystem changes
docker diff container-name

# Export filesystem for inspection
docker export container-name -o container.tar

# View container events
docker events
docker events --filter container=container-name

# Check why container stopped
docker inspect container-name | grep -A 10 State`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["debugging", "troubleshooting", "logs"],
        },
        {
          title: "Common Issues & Solutions",
          description:
            "Solve frequent Docker problems quickly.",
          code: `# Issue: "Cannot connect to Docker daemon"
# Solution: Start Docker service
sudo systemctl start docker
sudo service docker start  # On older systems

# Issue: "Permission denied"
# Solution: Add user to docker group
sudo usermod -aG docker $USER
# Then logout and login again

# Issue: "No space left on device"
# Solution: Clean up Docker resources
docker system prune  # Remove unused data
docker system prune -a  # Remove all unused images
docker volume prune  # Remove unused volumes
docker system df  # Check disk usage

# Issue: Port already in use
# Solution: Find and kill process or use different port
sudo lsof -i :8080
docker run -p 8081:80 nginx  # Use different port

# Issue: Container exits immediately
# Solution: Check logs and run interactively
docker logs container-name
docker run -it image-name /bin/bash

# Issue: DNS resolution not working
# Solution: Set custom DNS
docker run --dns 8.8.8.8 --dns 8.8.4.4 image-name

# Issue: Can't access container from host
# Solution: Check port mapping and network
docker port container-name
docker inspect container-name | grep IPAddress

# View full Docker system info
docker info
docker version`,
          language: "bash",
          difficulty: "intermediate",
          tags: ["troubleshooting", "common-issues", "solutions"],
        },
      ],
    },
    {
      id: "security",
      title: "Security Best Practices",
      description: "Secure your containers and images",
      examples: [
        {
          title: "Security Hardening",
          description:
            "Essential security practices for production containers.",
          code: `# 1. Run as non-root user
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# 2. Use specific image versions (not 'latest')
FROM nginx:1.24-alpine  # ✅ Good
FROM nginx:latest       # ❌ Bad

# 3. Scan images for vulnerabilities
docker scan myapp:latest

# 4. Use read-only filesystem
docker run --read-only -v /app/tmp:/tmp myapp

# 5. Limit resources
docker run --memory="512m" --cpus="1.0" myapp

# 6. Drop unnecessary capabilities
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp

# 7. No privileged containers
docker run --privileged myapp  # ❌ Dangerous!

# 8. Use secrets for sensitive data
echo "db_password" | docker secret create db_pass -
docker service create --secret db_pass myapp

# 9. Minimize attack surface
# Use distroless or alpine images
FROM gcr.io/distroless/nodejs:18

# 10. Regular updates
docker pull myimage:latest
docker-compose pull`,
          language: "dockerfile",
          difficulty: "advanced",
          tags: ["security", "hardening", "best-practices"],
          documentationUrl: "https://docs.docker.com/engine/security/",
        },
      ],
    },
  ],
};
