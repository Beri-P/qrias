# Qrias — Media Streaming Platform

A full-stack national broadcaster-style platform for streaming video, audio, and news content.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vue 3, Pinia, Vue Router, Vite |
| Backend | NestJS (Node.js), TypeORM |
| Databases | PostgreSQL, MongoDB, Redis |
| Auth | JWT, Passport.js |
| DevOps | Docker, GitHub Actions, Kubernetes |

## Quick Start

### Prerequisites
- Docker Desktop
- Node.js 22+

### 1. Start databases
```bash
cd infrastructure && docker compose up -d postgres mongo redis
```

### 2. Start API
```bash
cd api-gateway && npm install && npm run start:dev
```

### 3. Start frontend
```bash
cd frontend && npm install && npm run dev
```

### Full stack (Docker)
```bash
cd infrastructure && docker compose up -d
```

## API Docs
Swagger UI available at `http://localhost:3000/api/docs`

## Project Structure
qrias/
├── frontend/          # Vue 3 + Pinia SPA
├── api-gateway/       # NestJS REST API
├── ai-service/        # Python FastAPI (AI recommendations)
├── infrastructure/    # Docker Compose + K8s manifests
└── docs/              # Architecture docs + ADRs
