# Architecture

## Overview
Qrias follows a layered architecture with a Vue 3 SPA consuming a NestJS REST API backed by three data stores, each chosen for a specific workload.

## Data Flow
1. User requests hit the Vue 3 frontend (Nginx in production)
2. API calls go to the NestJS API Gateway
3. The API checks Redis for cached responses before hitting PostgreSQL
4. View events are written asynchronously to MongoDB
5. Cache is invalidated on any write operation

## Data Store Responsibilities
**PostgreSQL** — source of truth for structured data: users, content metadata, roles. Chosen for relational integrity and complex query support.

**MongoDB** — append-only analytics events. Document model fits variable event schemas; time-series queries are efficient with proper indexing.

**Redis** — TTL-based cache for hot content lists (2 min) and individual items (5 min).

## Caching Strategy
- `content:feed:<type>` — cached on GET, invalidated on create/publish/delete
- `content:item:<id>` — cached on GET, invalidated on publish/delete
- Cache-aside pattern: check cache → miss → query DB → write cache → return

## Authentication Flow
1. Client sends credentials to `POST /auth/login`
2. API validates, returns signed JWT (7 day expiry)
3. Client stores token in localStorage
4. Protected routes send token via `Authorization: Bearer <token>`
5. JwtStrategy validates token and attaches user to request
